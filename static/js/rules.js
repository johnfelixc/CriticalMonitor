/**
 * Created by 34154 on 23-12-2016.
 */
var selectCondItems = {
    "==" : "==",
    "!" : "!",
    "<" : "<",
    "<=": "<=",
    ">" : ">",
    ">=" : ">="
};
var selectParamItems = {
    "Air Flow" : "Air Flow",
    "AC Voltage" : "AC Voltage",
    "AC Current" : "AC Current",
    "DC Voltage": "DC Voltage",
    "DC Current" : "DC Current"
};
function addLogic(divName) {
    var newDiv = document.createElement("span");
    var newSelect = document.createElement("select");
    newSelect.name = "paramList[]";
    var newCondSelect = document.createElement("select");
    newCondSelect.name = "condList[]";
    var newInput = document.createElement("input");
    newInput.type = "number";
    newInput.name = "valueList[]";

    jQuery.each(selectCondItems, function(text, value) {
        var opt = document.createElement("option");
        opt.value= value;
        opt.text = text;

        newCondSelect.appendChild(opt);
    });
    jQuery.each(selectParamItems, function(text, value) {
        var opt = document.createElement("option");
        opt.value= value;
        opt.text = text;

        newSelect.appendChild(opt);
    });

    newDiv.appendChild(newSelect);
    newDiv.appendChild(newCondSelect);
    newDiv.appendChild(newInput);
    newDiv.appendChild(document.createElement("br"))
    document.getElementById(divName).appendChild(newDiv);
}

function addRule() {

    var rules = {};
    var jsonData = {};


    var params = $("select[name='paramList[]']")
      .map(function(){return $(this).val();}).get();

    var conds = $("select[name='condList[]']")
      .map(function(){return $(this).val();}).get();

    var values = $("input[name='valueList[]']")
      .map(function(){return $(this).val();}).get();

    var deviceId = document.getElementById("deviceId").value;

    var paramsLength = params.length;
    rules["and"] = [];
    for (var index = 0; index < paramsLength; index++) {
        var condStr = {};
        condStr[conds[index]] = [{"var": params[index]}, parseFloat(values[index])];
        rules.and.push(condStr);
    }

    if (deviceId) {
        var deviceCond = {};
        deviceCond["=="] = [{"var": "deviceId"}, deviceId];
        rules.and.push(deviceCond);
    }


    jsonData["rules"] = rules;
    jsonData["message"] = document.getElementById("alertMessage").value;

    if(document.getElementById("msgtype").selectedIndex == 0) {
        jsonData["email"] = document.getElementById("sendto").value;
    }
    else {
        jsonData["sms"] = document.getElementById("sendto").value;
    }
    jsonData["id"] = document.getElementById("ruleid").value;
    jsonData["refresh"] = 30;

    displayRuleRow(jsonData);

   /* $.ajax({
        type: 'POST',
        url: "/addrule",
        data: JSON.stringify(jsonData),
        dataType: "json",
        contentType: "application/json"
        }).done(function(msg) {
        alert("Data Saved: " + JSON.stringify(msg));
        }); */

}
function displayRuleRow(data) {
    var rowDiv = document.createElement('div');
    var deviceID = "All";
    var actionString = "";
    rowDiv.className = "div-table-row";
    if (data.hasOwnProperty("deviceId")){
        deviceID = data.deviceId;
    }
    if (data.hasOwnProperty("email")) {
        actionString = "E-Mail to: ";
        actionString = actionString.concat(data.email);
        actionString = actionString.concat("<br>");
        actionString = actionString.concat("Message: ");
        actionString = actionString.concat(data.message);
    }
    else if(data.hasOwnProperty("sms")) {
        actionString = "SMS to: ";
        actionString = actionString.concat(data.sms);
        actionString = actionString.concat("<br>");
        actionString = actionString.concat("Message: ");
        actionString = actionString.concat(data.message);
    }
    else  {
         actionString = "No Actions";
    }
    var logicRulesList = data.rules.and;
    var strLogic = "";
    for(var index = 0, size = logicRulesList.length; index < size ; index++) {
        for (var key in logicRulesList[index]) {
            var logicJson = logicRulesList[index][key];
            if(strLogic) {
                strLogic = strLogic.concat(" AND ");
            }
            strLogic = strLogic.concat(logicJson[0].var);
            strLogic = strLogic.concat(" ");
            strLogic = strLogic.concat(key);
            strLogic = strLogic.concat(" ");
            strLogic = strLogic.concat(logicJson[1].toString());
        }
    }

    var ruleData = [
        {
            "text": data.id,
            "class": "ruleid-div-table-col"
        },
        {
            "text": deviceID,
            "class": "deviceid-div-table-col"
        },
        {
            "text": strLogic,
            "class": "conditions-div-table-col"
        },
        {
            "text": actionString,
            "class": "actions-div-table-col"
        }
    ];

    for(var index = 0, size = ruleData.length; index < size ; index++) {
        var divCol = document.createElement('div');

        divCol.className = ruleData[index].class;
        divCol.innerHTML = ruleData[index].text;
        rowDiv.appendChild(divCol);

    }
    document.getElementById("rulesTable").appendChild(rowDiv);
    document.getElementById("ruleid").value = parseFloat(data.id) + 1;
}