const antifludE = 1;

if (!document.getElementById("helperMenu") && typeof jQuery == "function") {
    let helperBlock = $(`<div id="helperMenu" style="position: fixed; bottom: 145px; right: 10px; padding: 10px; background: #22242b; box-shadow: 0 4px 15px 0 rgba(0,0,0,0.2); border-radius: 8px; display: none;">
        <font class="text" id="azval">( 0 ) Авто-ноль: </font>
        <input type='checkbox' id='autoZero' onclick='this.checked ? $("#autozeroDelay").removeAttr("disabled") : $("#autozeroDelay").prop("disabled", true);'> 
        <div><input type="range" id="autozeroDelay" min="0" max="1000" value="0" onchange='$("#azval").text("( " + this.value + " ) Авто-ноль: ")' disabled></div>
        <div><font class="text" id="aeval">( 0 ) Авто-Enter: </font>
        <input type="checkbox" id="autoEnter" onclick='this.checked ? $("#autoenterDelay").removeAttr("disabled") : $("#autoenterDelay").prop("disabled", true);'> 
        <div><input type="range" id="autoenterDelay" min="0" max="1000" value="0" onchange='$("#aeval").text("( " + this.value + " ) Авто-Enter: ")' disabled></div></div>
        <div><font class="text"> Удаление букв: </font>
        <input type="checkbox" id="delSymbols"></div>
        <div><font class="text"> Ограничение в 5 цифр: </font>
        <input type="checkbox" id="maxFive"></div>
        <div><input id="actKey" class="input2" type="text" value="F9" style="width: 35px;" onfocus="this.focused=true;" onblur="this.focused=false;" readonly></div>
        <font style="cursor: default; color: #bdc6db; float: left; padding: 3px; font: 0.6rem / 1.0 sans-serif; font-family: -apple-system,BlinkMacSystemFont,\'Segoe UI\',\'Oxygen\',\'Ubuntu\',\'Cantarell\',\'Fira Sans\',\'Droid Sans\',\'Helvetica Neue\',sans-serif;">&copy; vk.com/kizzn</font>
    `)

    $("body").append(helperBlock)

    if ((location.href.slice(-7) == "#profil" || location.href.slice(-5) == "#room") && $("#helperMenu").is(":hidden")) $("#helperMenu").show()
    
    $('font[style="cursor: default; color: #bdc6db; float: left; padding: 3px; font: 0.6rem / 1.0 sans-serif; font-family: -apple-system,BlinkMacSystemFont,\'Segoe UI\',\'Oxygen\',\'Ubuntu\',\'Cantarell\',\'Fira Sans\',\'Droid Sans\',\'Helvetica Neue\',sans-serif;"]').click(() => { window.open('https://vk.com/kizzn', '_blank') })

    $(".knopki").on("click", (e) => { 
        if ($(e.currentTarget).attr("href") == "#top" && !$("#helperMenu").is(":hidden")) {
            $("#helperMenu").hide()
        } else if ($(e.currentTarget).attr("href") != "#top" && $("#helperMenu").is(":hidden")) {
            $("#helperMenu").show()
        }
    })

    $("body").on("keydown", (e) => {
        if ($("#actKey").is(":focus")) {
            $("#actKey").val(e.key.toUpperCase())
        }
        if (e.key.toLowerCase() === $("#actKey").val().toLowerCase() && !($("#full").length) && !$("#actKey").is(":focus") && location.href.slice(-4) != "#top") {
            $("#helperMenu").css("visibility", $("#helperMenu").css("visibility") == "hidden" ? "visible" : "hidden")
        }
        if ($("#full").length) {
            $("[name=otvet]").one("input", async (e) => {
		        if ($("#autoZero").is(":checked")) {
		            if ($("[name=otvet]").val().length === 4 && $("[name=otvet]").is(":focus") && $("[name=otvet]").val().match(/^[0-9]+$/) !== null) {
		                await new Promise(resolve => setTimeout(resolve, $("#autozeroDelay").val()));
		                if ($("#full").length) $("[name=otvet]").val($("[name=otvet]").val().substr(0, 4) + "0");
		            }	
		        }
		        if ($("#autoEnter").is(":checked")) {
		            if ($("[name=otvet]").val().length === 5 && $("[name=otvet]").is(":focus") && $("[name=otvet]").val().match(/^[0-9]+$/) !== null) {
		                await new Promise(resolve => setTimeout(resolve, $("#autoenterDelay").val()));
                        if ($("#full").length) {
                            /** **/
		                    vvod = new Date().getTime() - time;
		                    let data = $('form').serialize() + '&enter=1' + '&vvod=' + vvod + '&timestamp=' + new Date().toLocaleTimeString() + '&nick=' + document.getElementsByName('pnick')[0].value;
		    
		                        document.getElementById('full').parentNode.removeChild(document.getElementById('full'));
		                        console.log('Время: ' + vvod);
		                        kkk = 1;
		                        $.ajax({
		                            type: 'POST',
		                            url: 'kapcha.php',
		                            data: data,
		                            success: function(result)
		                            {
		                                if (!$("#full").length)
		                                {
		                                    $("#kapcha").html(result);
		                                };
		                            }
		                        });
                            /** **/
                        }
		            }
		        }
            });
            if ($("#delSymbols").is(":checked")) {
                if ($("[name=otvet]").is(":focus") && (
                    e.keyCode == 32  || // https://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
                    (e.keyCode > 64 && e.keyCode < 91)   ||
                    (e.keyCode > 185 && e.keyCode < 193) ||
                    (e.keyCode > 218 && e.keyCode < 223) )
                ) {
                    e.preventDefault(); return false;
                }
            }
            if ($("#maxFive").is(":checked")) {
                if ($("[name=otvet]").val().length === 5 && $("[name=otvet]").is(":focus") && (
                    (e.keyCode > 47 && e.keyCode < 58)   || // https://stackoverflow.com/questions/12467240/determine-if-javascript-e-keycode-is-a-printable-non-control-character
                    e.keyCode == 32 ||
                    (e.keyCode > 64 && e.keyCode < 91)   ||
                    (e.keyCode > 95 && e.keyCode < 112)  ||
                    (e.keyCode > 185 && e.keyCode < 193) ||
                    (e.keyCode > 218 && e.keyCode < 223) )
                ) {
                    e.preventDefault(); return false;
                }
            }
        }
    });
} else {
    if (typeof jQuery != "function") alert("На сайте отсутствует jQuery. Работа хелпера невозможна.");
    if (document.getElementById("helperMenu") && typeof jQuery == "function") alert("Вы уже запустили хелпер.");
}