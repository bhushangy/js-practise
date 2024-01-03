import PreviewView from "./previewView";

class ResultsView extends PreviewView {
  _parentElement = document.querySelector(".results");
  _errorMsg = "No recipes found. Please try again!!";
}

export default new ResultsView();