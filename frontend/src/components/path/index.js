import { h } from "preact";

// This is overly complex and need to be refactored or rewrote in some way
// The main issues comes from preact-router not handling relative links properly
// So we need to rebuild the path from the root ("/")
// Handling both search / browse at the same time is also challenging

export const Path = ({ fileInfo, currentDir }) => {
  // a Path can represent multiple sub-directories during search
  const splitPath = fileInfo.path.split("/");

  if (splitPath.length == 1) {
    // browse
    if (fileInfo.isDir) {
      const target =
        currentDir == ""
          ? `/${fileInfo.path}/`
          : `/${currentDir}/${fileInfo.path}/`;
      return <a href={target}>{fileInfo.path}</a>;
    }
    return <span>{fileInfo.path}</span>;
  }

  // search
  return (
    <>
      {splitPath
        .map((val, i) => {
          if (i == splitPath.length - 1 && !fileInfo.isDir) {
            return <span key={i}>{val}</span>;
          }
          const target =
            currentDir == ""
              ? `${splitPath.slice(0, i + 1).join("/")}/`
              : `/${currentDir}/${splitPath.slice(0, i + 1).join("/")}/`;
          return (
            <a key={i} href={target}>
              {val}
            </a>
          );
        })
        .reduce(
          (acc, val) => (acc === null ? [val] : [...acc, " / ", val]),
          null
        )}
    </>
  );
};

export const DoubleDotPath = ({ currentDir }) => {
  const split = currentDir.split("/");
  const target = split.slice(0, split.length - 1).join("/");
  return <a href={`/${target}`}>..</a>;
};
