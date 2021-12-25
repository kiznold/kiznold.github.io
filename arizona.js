var homeNalog = 104000;
var bizNalog = 250000;

var dayDeclension = new Array("день", "дня", "дней");
var hourDeclension = new Array("час", "часа", "часов");

var b = document.createElement("b");
var copyButton = document.createElement("input")

function RequiredDate(boolVal) {
    boolVal ? setRequiredDate() : offRequiredDate();
}

function setRequiredDate() {
    document.getElementById("inputDate").required = true;
    document.getElementById("inputTime").required = true;
}

function offRequiredDate() {
    document.getElementById("inputDate").required = false;
    document.getElementById("inputTime").required = false;
}

function setDefaultParameters() {
    for ( var i = 0; i<=23; i++ ) {
        document.getElementById("inputTime").add(new Option(i + ":00", i), undefined)
    }
}

function copiedState() {
    if (typeof document.getElementById("copyButton") != 'undefined' && document.getElementById("copyButton") != null) {
        document.getElementById("copyButton").setAttribute("disabled", true)
        document.getElementById("copyButton").setAttribute("value", "Скопировано!")
        setTimeout(() => {    
            document.getElementById("copyButton").removeAttribute("disabled", false)
            document.getElementById("copyButton").setAttribute("value", "Скопировать")
        }, 2500);        
    } else return "Error: CopyButton doesn't exist"
}

function copy(text) {
    var input = document.createElement('input');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
 }

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

function customDateCheck() {
    if (document.getElementById("customDate").checked && document.getElementById("inputTime").value != "" && document.getElementById("inputDate").value != "") { return true }
    else { return false }
}

function disabledDate(valbool) {
    valbool ? goDisabled() : offDisabled()
}

function goDisabled() {
    document.getElementById("inputDate").setAttribute("disabled", true); document.getElementById("inputTime").setAttribute("disabled", true)
}

function offDisabled() {
    document.getElementById("inputDate").removeAttribute("disabled"); document.getElementById("inputTime").removeAttribute("disabled")
}

function checkTaxForSetMax() {
    var tax = document.getElementById("tax")
    var radioButtons = document.getElementsByName("radiobutton");
    if (radioButtons[0].checked || radioButtons[1].checked) { tax.setAttribute("max", radioButtons[0].checked ? homeNalog : bizNalog) }
}

function isNumberInBetween(number, type) {
    if (type == "biz") {
        if (number > bizNalog)
            return false
        else if (number <= bizNalog)
            return true
    } else if (type == "home") {
        if (number > homeNalog)
            return false
        else if (number <= homeNalog)
            return true
    }
}

// if (window.location.host !== "kizn.fun") {
//     document.writeln("<script>alert(\"Сайт был украден у kizn'a, лучшего скриптера на всем свете\"); location.href = \"https://vk.com/kizzn\"</script>")
// } похуй

function getTaxType() {
    var radioHouse = document.getElementById("onHouse");
    var radioBiz = document.getElementById("onBiz");
    if (radioHouse.checked) { return "home" }
    else if (radioBiz.checked) { return "biz" }
}

function getTaxAmount() {
    var radioHouse = document.getElementById("onHouse");
    var radioBiz = document.getElementById("onBiz");
    if (radioHouse.checked) { return homeNalog }
    else if (radioBiz.checked) { return bizNalog }
}

function getLeftDeclension(val) {
    var stringedHour = val.toString();
    var lastDigit = stringedHour.charAt(stringedHour.length-1);
    var nmbrLastDigit = parseInt(lastDigit)
    if (nmbrLastDigit == 1) return " остался "
    else if (nmbrLastDigit > 1) return " осталось "
    else return " осталось "
}

function getHourDeclension(hourVal) {
    if (parseInt(hourVal) == 11) { return hourDeclension[2] } else {
    var stringedHour = hourVal.toString();
    var lastDigit = stringedHour.charAt(stringedHour.length-1);
    var nmbrLastDigit = parseInt(lastDigit)
    if (nmbrLastDigit == 0) return hourDeclension[2]
    else if (nmbrLastDigit == 1) return hourDeclension[0]
    else if (nmbrLastDigit == 2 || nmbrLastDigit == 3 || nmbrLastDigit == 4) return hourDeclension[1]
    else if (nmbrLastDigit > 4) return hourDeclension[2]
    else return "ч."
    }
}

function getDayDeclension(dayVal) {
    if (parseInt(dayVal) == 11) { return dayDeclension[2] } else {
    var stringedDay = dayVal.toString();
    var lastDigit = stringedDay.charAt(stringedDay.length-1);
    var nmbrLastDigit = parseInt(lastDigit)
    if (nmbrLastDigit == 0) return dayDeclension[2]
    else if (nmbrLastDigit == 1) return dayDeclension[0]
    else if (nmbrLastDigit == 2 || nmbrLastDigit == 3 || nmbrLastDigit == 4) return dayDeclension[1]
    else if (nmbrLastDigit > 4) return dayDeclension[2]
    else return "д."
    }
}

function getCorrectNumber(hours) {
    if (hours > 24) {
        return "или [" + Math.floor(hours/24) + "] " + getDayDeclension(Math.floor(hours/24)) + " [" + hours % 24 + "] " + getHourDeclension(hours%24)
    }
    if (hours % 24 == hours) return ""
}

function getCorrectInfoText() {
    var newDate = new Date(document.getElementById("inputDate").value)
    return customDateCheck() ? "от " + newDate.toLocaleDateString("ru-RU") + ": [" : "от текущего дня и времени: ["
}

function AreInputsDateCorrect() {
    var dateInput = document.getElementById("inputDate")
    var timeInput = document.getElementById("inputTime")
    if (dateInput.validity.valid && timeInput.validity.valid) { return true }
    else { return false }
}

function getTimeOfSale() {
    var divCopy = document.getElementById("copy");
    var tax = document.getElementById("tax");
    var taxInHour = document.getElementById("taxInHour");
    var result = document.getElementById("result");
    var resultDate = document.getElementById("result2");
    var dateCustom = document.getElementById("customDate")
    var radiobtns = document.getElementsByName("radiobutton");
    if ( (radiobtns[0].checked || radiobtns[1].checked) && tax.validity.valid && taxInHour.validity.valid && isNumberInBetween(tax.value, getTaxType()) && tax.value > 0 && taxInHour.value > 0 && dateCustom.checked ? AreInputsDateCorrect() : 1 ) {
        // -- \\
        var currentDate = 0;
        // -- All variables -- \\
        var hours = (getTaxAmount() - tax.value) / taxInHour.value; 
        if (document.getElementById("currentTime").checked) {
        var currentDate = new Date(Date.now() + (new Date().getTimezoneOffset() + 3 * 60) * 1000 * 60);
        // currentDate.setDate(currentDate.getDate() + Math.floor(hours/24))
        currentDate.setHours(currentDate.getHours() + Math.ceil(hours))
        currentDate.setMinutes(0); currentDate.setSeconds(0);
        } else if (customDateCheck()) {
        var currentDate = new Date(document.getElementById("inputDate").value)
        // currentDate.setDate(currentDate.getDate() + Math.floor(hours/24))
        currentDate.setHours(parseInt(document.getElementById("inputTime").value) + Math.ceil(hours))
        currentDate.setMinutes(0); currentDate.setSeconds(0);
        }
        // -- All variables -- \\
        if (currentDate != 0 && isValidDate(currentDate) && !isNaN(currentDate.getHours())) {

            if (Math.sign(Math.ceil(hours)) == 1) {
                var infoDate = currentDate.toLocaleDateString("ru-RU") + " " + currentDate.getHours() + ":00]"
                var firstText = "До слета" + getLeftDeclension(Math.ceil(hours)) + "[" + Math.ceil(hours) + "] " + getHourDeclension(Math.ceil(hours)) + " " + getCorrectNumber(Math.ceil(hours));
                var secondText = "Дата слета " + getCorrectInfoText() + infoDate
                customDateCheck() ? result.innerHTML = "" : result.innerHTML = firstText
                resultDate.innerHTML = secondText

                b.innerText = " МСК"
                resultDate.appendChild(b)

                copyButton.setAttribute("type", "submit")
                copyButton.setAttribute("id", "copyButton")
                copyButton.value = "Скопировать"
                copyButton.setAttribute("onclick", "copy(\"Слет в: " + "[" + infoDate + " МСК" + "\"); copiedState();")
                divCopy.appendChild(copyButton)

                return true;

            } else if (Math.sign(Math.ceil(hours)) == -1) { console.log("Error: Negative number."); return false; }
            else if (!isNumberInBetween(tax.value, getTaxType())) { console.log("Error: Number is not in between."); return false; }
            else { console.log("Unknown error."); return false; }

        } else { console.log("Error: Incorrect date."); return false; }
        // -- \\
    }
}
