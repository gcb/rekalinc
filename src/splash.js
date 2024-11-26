let txt = '';
let out = document.getElementById('out');
function makeIndent(indentLength) {
  return ".".repeat(indentLength);
}

function logItems(bookmarkItem, indent) {
  if (bookmarkItem.url) {
    console.log(makeIndent(indent) + bookmarkItem.url);
    txt += makeIndent(indent) + bookmarkItem.url;
  } else {
    console.log(`${makeIndent(indent)}Folder`);
    txt += `${makeIndent(indent)}Folder`;
    indent++;
  }
  if (bookmarkItem.children) {
    for (const child of bookmarkItem.children) {
      logItems(child, indent);
    }
  }
  indent--;
}

function logTree(bookmarkItems) {
  logItems(bookmarkItems[0], 0);
  out.value = txt;
}

function onRejected(error) {
  console.log(`An error: ${error}`);
}

let gettingTree = browser.bookmarks.getTree();
gettingTree.then(logTree, onRejected);
