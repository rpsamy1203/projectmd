(function () {
    let tmpl = document.createElement("template");
    tmpl.innerHTML = `
      <style>
          fieldset {
              margin-bottom: 10px;
              border: 1px solid #afafaf;
              border-radius: 3px;
          }
          table {
              width: 100%;
          }
          input, textarea, select {
              font-family: "72",Arial,Helvetica,sans-serif;
              width: 100%;
              padding: 4px;
              box-sizing: border-box;
              border: 1px solid #bfbfbf;
          }
          input[type=checkbox] {
              width: inherit;
              margin: 6px 3px 6px 0;
              vertical-align: middle;
          }
      </style>
      <form id="form" autocomplete="off">
        <fieldset> 
          <legend>General</legend>
          <table>
            <tr>
              <td><label for="ProjectID">ProjectID</label></td>
              <td><input id="ProjectID" name="ProjectID" type="text"></td>
            </tr>
            <tr>
              <td><label for="Description">Description</label></td>
              <td><input id="Description" name="Description" type="text"></td>
            </tr>
            <tr>
              <td><label for="WBSE">WBSE</label></td>
              <td><input id="wbse" name="wbse" type="text"></td>
            </tr>
            <tr>
              <td><label for="projectname">ProjectName</label></td>
              <td><input id="projectname" name="projectname" type="text"></td>
            </tr>
            <tr>
              <td><label for="project">Project</label></td>
              <td><input id="project" name="project" type="text"></td>
            </tr>
            <tr>
              <td><label for="compcode">CompanyCode</label></td>
              <td><input id="compcode" name="compcode" type="text"></td>
            </tr>
            <tr>
              <td><label for="capitalcharge">capitalchage</label></td>
              <td><input id="capitalchage" name="capitalchage" type="text"></td>
            </tr>
            <tr>
              <td><label for="costcenter">costcenter</label></td>
              <td><input id="costcenter" name="costcenter" type="text"></td>
            </tr>
            <tr>
              <td><label for="projectmanager">ProjectManager</label></td>
              <td><input id="projectmanager" name="projectmanager" type="text"></td>
            </tr>

            </table>
        </fieldset>
        <button type="submit" hidden>Submit</button>
      </form>
    `;

    class ExcelAps extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));

            let form = this._shadowRoot.getElementById("form");
            form.addEventListener("submit", this._submit.bind(this));
            form.addEventListener("change", this._change.bind(this));
        }

        connectedCallback() {
        }

        _submit(e) {
            e.preventDefault();
            let properties = {};
            for (let name of ExcelAps.observedAttributes) {
                properties[name] = this[name];
            }
            this._firePropertiesChanged(properties);
            return false;
        }
        _change(e) {
            this._changeProperty(e.target.name);
        }
        _changeProperty(name) {
            let properties = {};
            properties[name] = this[name];
            this._firePropertiesChanged(properties);
        }

        _firePropertiesChanged(properties) {
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        get projectid() {
            return this.getValue("projectid");
        }
        set projectid(value) {
            this.setValue("projectid", value);
        }

        get description() {
            console.log(this.getValue("description"));
            return this.getValue("description");
        }
        set description(value) {
            this.setValue("description", value);
        }

        get wbse() {
            return this.getValue("wbse");
        }
        set wbse(value) {
            this.setValue("wbse", value);
        }

        get projectname() {
            return this.getValue("projectname");
        }
        set projectname(value) {
            this.setValue("projectname", value);
        }

        get capitalcharge() {
            return this.getValue("capitalcharge");
        }
        set capitalcharge(value) {
            this.setValue("capitalcharge", value);
        }

        get costcenter() {
            return this.getValue("costcenter");
        }
        set costcenter(value) {
            this.setValue("costcenter", value);
        }

        get projectmanager() {
            return this.getValue("projectmanager");
        }
        set projectmanager(value) {
            this.setValue("projectmanager", value);
        }
        get financemanager() {
            return this.getValue("financemanager");
        }
        set financemanager(value) {
            this.setValue("financemanager", value);
        }

        getValue(id) {
            return this._shadowRoot.getElementById(id).value;
        }
        setValue(id, value) {
            this._shadowRoot.getElementById(id).value = value;
        }

        static get observedAttributes() {
            return [
                "projectid",
                "description",
                "wbse",
                "projectname",
                "project",
                "compcode",
                "capitalcharge",
                "prjectmanager",
                "financemanager"
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue != newValue) {
                this[name] = newValue;
            }
        }
    }
    customElements.define("com.sap.nbcu.itplan.sac-excel-aps", ExcelAps);
})();
