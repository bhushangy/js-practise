import icons from "url:../../img/icons.svg";

export default class View {
	_data;
	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0))
			return this.renderError();
		this._data = data;
		const markUp = this._generateMarkup();
		this._clear();
		// Insert markup as the first child of recipeContainer
		this._parentElement.insertAdjacentHTML("afterbegin", markUp);
	}

	update(data) {
		this._data = data;
		const updatedMarkup = this._generateMarkup();

		const updatedDom = document
			.createRange()
			.createContextualFragment(updatedMarkup);
		const newDomElements = Array.from(updatedDom.querySelectorAll("*"));
		const currentDomElements = Array.from(
			this._parentElement.querySelectorAll("*")
		);

		newDomElements.forEach((newDomElement, index) => {
			const currentDomElement = currentDomElements[index];

			// Updates text content of the changed nodes
			if (
				!newDomElement.isEqualNode(currentDomElement) &&
				newDomElement.firstChild?.nodeValue.trim() !== ""
			) {
				currentDomElement.textContent = newDomElement.textContent;
			}

			// Updates attributes of the changed nodes
			if (!newDomElement.isEqualNode(currentDomElement)) {
				Array.from(newDomElement.attributes).forEach((attribute) =>
					currentDomElement.setAttribute(attribute.name, attribute.value)
				);
			}
		});
	}

	// Remove any existing content inside recipeContainer i.e spinner
	_clear() {
		this._parentElement.innerHTML = "";
	}

	// Public method because controller needs to call this while fethcing data
	renderSpinner = () => {
		const spinnerMarkUp = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
      `;
		// Remove any existing content inside parentElement
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", spinnerMarkUp);
	};

	renderError(message = this._errorMsg) {
		const errorMarkUp = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
		// Remove any existing content inside parentElement
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", errorMarkUp);
	}

	renderSuccess(message = this._message) {
		const errorMarkUp = `
        <div class="message">
          <div>
            <svg>
              <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;

		// Remove any existing content inside parentElement
		this._clear();
		this._parentElement.insertAdjacentHTML("afterbegin", errorMarkUp);
	}
}
