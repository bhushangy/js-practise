import PreviewView from "./previewView.js";

class BookmarksView extends PreviewView {
	_parentElement = document.querySelector(".bookmarks__list");
	_errorMsg = "No bookmarks yet...";

	addBookmarksHandler(handler) {
		window.addEventListener("load", handler);
	}
}

export default new BookmarksView();