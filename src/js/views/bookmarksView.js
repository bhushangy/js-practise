import PreviewView from "./previewView.js";

class BookmarksView extends PreviewView {
	_parentElement = document.querySelector(".bookmarks__list");
	_errorMsg = "No bookmarks yet...";
}

export default new BookmarksView();