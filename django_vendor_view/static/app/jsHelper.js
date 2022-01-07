function renderHelper(rowKeys, config, row, render) {
    // let render = "";

    rowKeys.map((key, index) => {

        // data type of key == "string" e.g {deleted_at: DATE}

        if (config && Object.keys(config).includes(key)) {
            // replace a key value with custom value

            if (config[key] === "moment") {
                render = render.replaceAll(`[${key}]`, moment(row[key]).fromNow() );
            }
            else if (config[key] === "status_toggle") {
                if (row[key]) {
                    // deleted
                    render = render.replaceAll(`[${key}]`, false);
                    render = render.replaceAll(`[${config[key]}]`, "Activate");
                }
                else {
                    // column value == null i.e not deleted still active
                    render = render.replaceAll(`[${key}]`, true);
                    render = render.replaceAll(`[${config[key]}]`, "Deactivate");
                }
            }
            else if (config[key] === "count") {
                render = render.replaceAll(`[${key}]`, (row[key]).length);
            }
        }
        else {
            render = render.replaceAll(`[${key}]`, row[key]);
        }

        // prioritize arrays before objects
        if (Array.isArray(row[key])) {
            // if child data is an array
            // access children content to pull data
            // data type of key == "Array" e.g {data: []}
            const innerRows = row[key];
            innerRows.map((innerRow, index) => {
                //access array data
                if (typeof innerRow === 'object')
                {
                    const innerRowKeys = Object.keys(innerRow);
                    //keys of array objects
                    innerRowKeys.map(innerRowKey => {
                        render = render.replaceAll(`[${key}.${innerRowKey}]`, innerRow[innerRowKey]);
                    });
                }
                else if (Array.isArray(innerRow)) {}
            });
        }
        else if (row[key] && typeof row[key] === 'object') {
            const innerRowKeys = Object.keys(row[key]);
            //keys of array objects
            innerRowKeys.map(innerRowKey => {
                render = render.replaceAll(`[${key}.${innerRowKey}]`, row[key][innerRowKey]);
            });
        }
    });

    return render;
}

function getConfig(config) {
    if (config) {
        try {
            config = JSON.parse(config);
        }
        catch
        {
            config = undefined;
        }
    }

    return config;
}

function initHelperLoad() {
    log("GET", $('[element-type="get"]').children().length);
    if ($('[element-type="get"]').length > 0 ) {
        $('[element-type="get"]').map(function (index, child) {
            const url = child.getAttribute('url');
            let dataKey = child.getAttribute('data-key');
            let spinnerGif = $("div[id='spinner_loader']");
            let tableDiv = $("#table_div");
            let config = getConfig(child.getAttribute('element-config'));

            request(url, 'get', undefined,
                (data) => {
                    log(data);
                    if (data.code === data.negative || data.code === data.error) {
                        showErrorMessage(data);
                    }
                    else {
                        showPositiveMessage(data);
                        if (data.data[dataKey]) {
                            const rows = data.data[dataKey];
                            rows.map(row => {
                                let rowKeys = Object.keys(row);
                                let render = child.getAttribute('render');
                                render = renderHelper(rowKeys, config, row, render);
                                $(child.getAttribute('element-target')).append(render);
                            });
                        }

                    }
                    tableDiv.css('display', 'block');
                    spinnerGif.css('display', 'none');

                },
                (xhr,status,error) => {
                    //fail silently
                    log(JSON.stringify(xhr), JSON.stringify(status), JSON.stringify(error));
                    showErrorMessage(xhr.responseJSON);
                    tableDiv.css('display', 'block');
                    spinnerGif.css('display', 'none');
                },
            );
        });
    }

    if ($('[element-type="get-single"]').children().length > 0 ) {
        const child = $('[element-type="get-single"]')[0];
        let url = child.getAttribute('url');
        let dataKey = child.getAttribute('data-key');
        dataKey = getDataKeyReady(dataKey);
        let elementRender = child.getAttribute('element-render');
        let spinnerGif = $("div[id='spinner_loader']");
        let tableDiv = $("#table_div");
        let config = getConfig(child.getAttribute('element-config'));

        if (url.includes("[__me]")) {
            if (adminData !== undefined && adminData.token) {
                url = url.replace("[__me]", adminData.id);

            }
            else if (userData !== undefined && userData.token) {
                url = url.replace("[__me]", userData.id);
            }

        }

        log(url, dataKey);

        request(url, 'get', undefined,
            (data) => {
                log(data);
                if (data.code === data.negative || data.code === data.error) {
                    showErrorMessage(data);
                }
                else {
                    showPositiveMessage(data);
                    const elementData = $("[element-data]");
                    if (data.data[dataKey]) {
                        const rows = data.data[dataKey];

                        // loop thru all gotten children with selected attr
                        if (elementData.length > 0) {
                            elementData.map((index, child) => {

                                const key = child.getAttribute('element-data');
                                // log("child", child, index, key, rows[key]);
                                if (child.getAttribute('type') === "radio") {
                                //    radio button
                                }

                                let changedValue = rows[key];
                                if (config && Object.keys(config).includes(key)) {

                                    if (elementRender === "val") {
                                        if (config[key] === "year_format") {
                                            changedValue = moment(rows[key]).format("YYYY-MM-DD");
                                        }
                                        else if (config[key] === "moment") {
                                            changedValue = moment(rows[key]).fromNow();
                                        }
                                    }
                                }
                                else {
                                    changedValue = rows[key];
                                }


                                if (elementRender === "val") {

                                    if (child.getAttribute('type') === 'radio' && changedValue === child.value) {
                                        log("radio", changedValue === child.value, child.value, changedValue);
                                        child.checked = true;
                                    }
                                    if (child.getAttribute('type') === 'checkbox' && changedValue === child.value) {
                                        log("radio", changedValue === child.value, child.value, changedValue);
                                        child.checked = true;
                                    }
                                    child.value = changedValue;
                                }
                                else {
                                    child.innerText = changedValue;
                                }
                            });
                        }
                    }

                }
                tableDiv.css('display', 'block');
                spinnerGif.css('display', 'none');

            },
            (xhr,status,error) => {
                //fail silently
                log(JSON.stringify(xhr), JSON.stringify(status), JSON.stringify(error));
                showErrorMessage(xhr.responseJSON);
                tableDiv.css('display', 'block');
                spinnerGif.css('display', 'none');
            },
        );
    }

    helperElementSingle();
}

function helperElementSingle(opts=undefined) {
    if (opts === undefined) {
        opts = {};
    }

    if (opts.element === undefined) {
        opts.element = $('[element-type="single-element"]');
    }

    if (opts.element.length > 0 ) {
        opts.element.map(function (index, child) {
            // let url = child.getAttribute('url');
            let url = wrapUrlWithDates(child);
            let dataKey = child.getAttribute('data-key');
            dataKey = getDataKeyReady(dataKey);
            let elementRender = child.getAttribute('element-render');
            let spinnerGif = $("div[id='spinner_loader']");
            let tableDiv = $("#table_div");
            let config = getConfig(child.getAttribute('element-config'));


            log(url, dataKey);

            request(url, 'get', undefined,
                (data) => {
                    log(data);
                    if (data.code === data.negative || data.code === data.error) {
                        // showErrorMessage(data);
                    }
                    else {
                        // showPositiveMessage(data);

                        // getDataReady(data, dataKey);
                        if (!data.data[dataKey]) {
                            const oldData = Object.assign({}, data.data);
                            data.data = {};
                            data.data[dataKey] = oldData;
                        }

                        if (data.data[dataKey]) {
                            const rows = data.data[dataKey];
                            const rowKeys = Object.keys(rows);

                            // loop thru all gotten children with selected attr
                            if (rowKeys.length > 0) {
                                rowKeys.map((index, innerChild) => {
                                    const key = child.getAttribute('element-data');

                                    let changedValue = rows[key];
                                    if (config && Object.keys(config).includes(key)) {

                                        if (elementRender === "val") {
                                            if (config[key] === "year_format") {
                                                changedValue = moment(rows[index][key]).format("YYYY-MM-DD");
                                            }
                                            else if (config[key] === "moment") {
                                                changedValue = moment(rows[index][key]).fromNow();
                                            }
                                        }
                                    }
                                    else {
                                        changedValue = rows[index][key];
                                    }

                                    changedValue = parseFloat(changedValue).toFixed(2);


                                    if (elementRender === "val") {

                                        if (child.getAttribute('type') === 'radio' && changedValue === child.value) {
                                            log("radio", changedValue === child.value, child.value, changedValue);
                                            child.checked = true;
                                        }
                                        if (child.getAttribute('type') === 'checkbox' && changedValue === child.value) {
                                            log("radio", changedValue === child.value, child.value, changedValue);
                                            child.checked = true;
                                        }
                                        child.value = numberWithCommas(changedValue);
                                    }
                                    else {
                                        child.innerText = numberWithCommas(changedValue);
                                    }
                                });
                            }
                        }

                    }
                    tableDiv.css('display', 'block');
                    spinnerGif.css('display', 'none');

                },
                (xhr,status,error) => {
                    //fail silently
                    log(JSON.stringify(xhr), JSON.stringify(status), JSON.stringify(error));
                    // showErrorMessage(xhr.responseJSON);
                    tableDiv.css('display', 'block');
                    spinnerGif.css('display', 'none');
                },
            );
        });
    }
}

function helperDelete(e, elem) {
    e.cancelBubble = true;
    e.preventDefault();
    e.stopPropagation();


    let toggle = elem.getAttribute('active') !== undefined;
    let  url = elem.getAttribute('url');
    log(url, toggle, "info");

    request(url, 'get', undefined,
        (data) => {
            log(data);
            if (data.code === data.negative || data.code === data.error) {
                showErrorMessage(data);
            }
            else {
                showPositiveMessage(data);

                elem.setAttribute("active", elem.getAttribute("active") === "true" ? "false" : "true");
                elem.innerText = (elem.getAttribute("active") === "true" ? "Deactivate" : "Activate");

            }
            tableDiv.css('display', 'block');
            spinnerGif.css('display', 'none');

        },
        (xhr,status,error) => {
            //fail silently
            log(JSON.stringify(xhr), JSON.stringify(status), JSON.stringify(error));
            showErrorMessage(xhr.responseJSON);
            tableDiv.css('display', 'block');
            spinnerGif.css('display', 'none');
        },
    );
}

function postWithImage(e, element) {
    const elementData = $("[element-data]");

    let data = {};
    let  url = element.getAttribute('url');

    let postData = new FormData();
    postData.append("a", "a");

    for(let i = 0; i < elementData.length; i++) {
        const childElement = elementData[i];

        log("Elem Data", childElement.getAttribute("element-data"));

        if (childElement.getAttribute('type') === "radio" && !childElement.checked) {
            continue;
        }
        else if (childElement.getAttribute('type') === "file") {
            log(childElement.files, childElement.files.length);
            // image
            if(childElement.files.length !== 0) postData.append(childElement.getAttribute("element-data"), childElement.files[0]);
        }
        else {
            log(typeof  postData, JSON.stringify(postData.keys()));
            if (childElement.getAttribute('type') === "radio" && !childElement.checked) {
                continue;
            }
            postData.append(childElement.getAttribute("element-data"), childElement.value);
        }
    }

    request(url,
        'post',
        postData,
        (data) => {
            log(data);
            if (data.code === data.negative || data.code === data.error) {
                showErrorMessage(data);
            }
            else {showPositiveMessage(data);}

        },
        (xhr,status,error) => {
            //fail silently
            log(JSON.stringify(xhr), JSON.stringify(status), JSON.stringify(error));
            showErrorMessage(xhr.responseJSON);
        },
        undefined,
        "",
        false,
        false,
        ""

    );
}

function post(e, element) {
    const elementData = $("[element-data]");

    let data = {};
    let  url = element.getAttribute('url');

    log("list", elementData, elementData.length);

    for(let i = 0; i < elementData.length; i++) {
        const childElement = elementData[i];

        if (childElement.getAttribute('type') === "radio" && !childElement.checked) {
            continue;
        }
        log("Elem Data", childElement.getAttribute("element-data"));

        data[childElement.getAttribute("element-data")] = childElement.value;
    }
    log("element data", data);

    request(url, 'post',
        data,
        (data) => {
            log(data);
            if (data.code === data.negative || data.code === data.error) {
                showErrorMessage(data);
            }
            else {
                showPositiveMessage(data);

            }
        },
        (xhr,status,error) => {
            //fail silently
            log(JSON.stringify(xhr), JSON.stringify(status), JSON.stringify(error));
            showErrorMessage(xhr.responseJSON);
        },
    );
}

function myListener(event) {
    const element = event.target;

    if (element.getAttribute("element-type") === "post") {
        event.stopPropagation();
        event.preventDefault();

        post(event, element);
    }
    else if (element.getAttribute("element-type") === "post-file") {
        event.stopPropagation();
        event.preventDefault();
        postWithImage(event, element);
    }
    else if (element.getAttribute("element-type") === "delete") {
        event.stopPropagation();
        event.preventDefault();
        helperDelete(event, element);
    }

}

$(document).ready(function () {
    document.addEventListener( "click", myListener );
    initHelperLoad();
});