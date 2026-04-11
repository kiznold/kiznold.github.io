// ORIGINAL CODE - JOSIP
// MODIFIED BY - vk.com/kizzn

// уебки не лезьте сюда
(function() {
    const original_CanvasRenderingContext2D_fillText = CanvasRenderingContext2D.prototype.fillText;
    let chatStatus = 0;
    let captchaStatus = 0;
    let morgen = 0;
    let fakeStatus = 0;
    let fCaptcha = 0;
    let mode = 0;
    let enableCamS = 0;
    let modeChange = 0;
    let paydayStatus = 0;
    let paydayHelp = 0;
    let paydayAutoStatus = 0;
    let nStatus = 0;
    let pressedN = 0;
    let reaction = 0;
    let firstSymbol = 0;
    let firstSymbolStatus = 0;
    let stopStatus = 0;
    let againPayday = 0;
    let paydayDo = 0;
    let paydayDone = 0;
    let zaprosFCaptchi = 0;
    let chatGenerator = 0;
    let chatTyped = [];
    let lastValue = 0;
    let chatSteps = null;
    let changedKeyCode = 0;
    let changedKeyCodeNeed = 0;
    let openCaptchaKeyOne = 115;
    let openCaptchaKeyTwo = 78;
    let modeFcaptchaRequired = 0;
    let recordArr = [];
    let captchaLagStatus = 0;
    let captchaLagWaiting = 0;
    let zeroCaptchaStatus = 0;
    let captchaTimer = -1;
    let firstSymbolTimer = -1;
    let captchaRecord = -1;
    let oldCaptchaMode = false;
    let reactionTimer = -1;
    
    function newRecordX() {
        document.getElementById('headlineControl').innerText = 'Control [' + captchaRecord + 's]';
        document.getElementById('record').style.display = 'block';
        document.getElementById('recordS').innerHTML = captchaRecord + 's';
        setTimeout(() => {
            document.getElementById('record').style.display = 'none';
        }, 1500)
    }
    
    function typeChat(text) {
        document.getElementById('chatArea').value = document.getElementById('chatArea').value + text + '\x0A';
        document.getElementById('chatArea').scrollTop = 450000 * 100 * 3;
    }

    function setDisplay(id, value) {
        document.getElementById(id).style.display = value;
    }

    function setSelected(id, selected) {
        document.getElementById(id).classList.toggle('btnSelected', selected);
    }

    function setCaptchaPanelsVisible(isVisible) {
        const displayValue = isVisible ? 'block' : 'none';
        document.getElementsByClassName('captchaDiv')[0].style.display = displayValue;
        document.getElementsByClassName('typeDiv')[0].style.display = displayValue;
    }

    function runChatCommand(chatValue) {
        const commands = {
            '/time': function() {
                time();
            },
            '/help': function() {
                typeChat('');
                typeChat('/help - помощь по командам');
                typeChat('/buybiz - купить бизнес(открыть капчу командой)');
                typeChat('/key - сбросить клавиши открытия капчи');
                typeChat('/about - о создателе');
                typeChat('/record - рекорды');
                typeChat('/clear - очистить чат');
                typeChat('/zero  - последняя цифра капчи 0');
                typeChat('');
            },
            '/clear': function() {
                for (var i = 0; i < 9; i++) {
                    typeChat('')
                }
            },
            '/zero': function() {
                zeroCaptchaX();
            },
            '/about': function() {
                typeChat('Сайт сделан Josip (Teor_New) для тренировки капчи, модифицирован и поддерживается k1zn\'ом.');
            },
            '/record': function() {
                recordArr = recordArr.sort((a, b) => a - b);
                if (recordArr.length > 0) {
                    for (let i = 0; i < recordArr.length; i++) {
                        typeChat((i + 1) + ") " + recordArr[i] + "s")
                    }
                } else {
                    typeChat("Рекордов ещё нету!")
                }
            },
            '/key': function() {
                typeChat('Клавиши открытия капчи были сброшены, открыть капчу можно нажатием F4 или N');
                openCaptchaKeyOne = 115;
            },
            '/buybiz': function() {
                if (mode == 0) {
                    captchaLagged()
                }
                if (mode == 1) {
                    if (paydayStatus) {
                        captchaLagged()
                    }
                    if (!paydayStatus) {
                        typeChat('Сначала активируйте режим нажатием N')
                    }
                } else {
                    if (mode != 0)
                        typeChat('Данная команда доступна исключительно в режиме N');
                }
            }
        };

        const handler = commands[chatValue];
        if (handler) {
            handler();
            return true;
        }
        return false;
    }
    
    function changeKey() {
        typeChat('Нажмите на клавиатуре клавишу, на которую желаете заменить');
        changedKeyCodeNeed = 1;
    }
    
    function modeN() {
        if (!modeChange) {
            if (document.body.style.background == '#454545') document.body.style.background='#383838';
            if (!chatGenerator) {
                setDisplay('chatGen', 'none');
                setDisplay('stopP', 'none');
                setSelected('modeN', true);
                if (mode) {
                    setSelected('modeP', false)
                };
                if (mode == 2) {
                    setSelected('modeF', false)
                };
                typeChat('Включен ручной режим ввода капчи, для открытия капчи нажмите N,F4 или же напишите в чат /buybiz (открыть чат на Т англ)');
                mode = 0;
                setDisplay('houseSale', 'none')
            };
            if (chatGenerator) {
                typeChat('Выключите генератор строк чата')
            }
        } else {
            typeChat('Ошибка переключения режимов, закройте окно с капчей или нажмите Stop')
        }
    }
    
    function modeP() {
        if (!modeChange) {
            if (document.body.style.background == '#454545') document.body.style.background='#383838';
            paydayAutoStatus = 0;
            setDisplay('chatGen', 'inline-block');
            setDisplay('stopP', 'inline-block');
            setSelected('modeP', true);
            if (!mode) {
                setSelected('modeN', false)
            };
            if (mode == 2) {
                setSelected('modeF', false)
            };
            typeChat('Включен режим Payday, для начала нажмите N или F4, пейдей будет через 0.9-2с, для остановки нажмите кнопку Stop');
            mode = 1;
            setDisplay('houseSale', 'block')
        } else {
            
            typeChat('Ошибка переключения режимов, закройте окно с капчей')
        }
    }
    function enableCamC() {
        enableCamS = !enableCamS;
        document.getElementById('enableCam').classList.toggle('btnSelected');
        typeChat(`HandCam режим ${enableCamS ? 'включен' : 'выключен'}`);
        const width = 320;
        let height = 0;

        if (!enableCamS) {
            const v = document.getElementById('video');
            v.srcObject.getVideoTracks().forEach(t => t.stop());
            v.srcObject = null
            return;
        } 

        const video = document.getElementById('video');
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            enableCamS = false;
            document.getElementById('enableCam').classList.remove('btnSelected');
            typeChat('Не удалось включить HandCam режим! Подробнее в F12')
            console.log("HANDCAM error occurred: " + err);
        });

        let streaming = false;
        video.addEventListener('canplay', function(ev){
            console.log('canplay')
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth/width);
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                streaming = true;
            }
        }, {
            once: true
        });

    }
    function modeF() {
        if (!modeChange) {
            if (document.body.style.background == '#454545') document.body.style.background='#383838';
            if (!chatGenerator) {
                if (captchaLagStatus == 1) {
                    captchaLag()
                };
                setDisplay('chatGen', 'none');
                setDisplay('stopP', 'inline-block');
                setSelected('modeF', true);
                if (!mode) {
                    setSelected('modeN', false)
                };
                if (mode) {
                    setSelected('modeP', false)
                };
                mode = 2;
                setDisplay('houseSale', 'none');
                
                typeChat('Включен режим зацикленной капчи. Для начала нажмите N, после ввода капчи сразу же откроется новая')
            }
        } else {
            
            typeChat('Ошибка переключения режимов, закройте окно с капчей или нажмите кнопку Stop')
        }
    }
    
    function captchaLag() {
        if (mode >= 2) {
            typeChat('Ошибка режимов');
            return;
        }

        captchaLagStatus = captchaLagStatus ? 0 : 1;
        setSelected('captchaLag', !!captchaLagStatus);
        typeChat(captchaLagStatus
            ? 'Включен режим лагов капчи(симуляция пинга)'
            : 'Выключен режим лагов капчи(симуляция пинга)');
    }
    
    function captchaLagged() {
        if (!captchaLagWaiting) {
            if (captchaLagStatus) {
                captchaOpenDelay = Math.floor(Math.random() * (250 - 10) + 10);
                
                setTimeout(captchaOpen, captchaOpenDelay);
                captchaLagWaiting = 1
            }
        };
        if (!captchaLagStatus) {
            captchaOpen()
        }
    }
    
    function zeroCaptchaX() {
        zeroCaptchaStatus = zeroCaptchaStatus ? 0 : 1;
        typeChat(zeroCaptchaStatus
            ? 'Капча с окончанием на 0 включена'
            : 'Капча с окончанием на 0 выключена');
    }

    document.getElementById('chatInpt').addEventListener('keyup', function(keyEvent) {
        keyEvent.preventDefault();
        if (keyEvent.keyCode === 38) {
            if (chatSteps == null) {
                lastValue = document.getElementById('chatInpt').value;
                chatSteps = chatTyped.length
            };
            if (chatSteps > 0) {
                chatSteps = chatSteps - 1
            };
            
            if (chatTyped.length > 0) {
                document.getElementById('chatInpt').value = chatTyped[chatSteps]
            }
        };
        if (keyEvent.keyCode === 40) {
            
            if (chatSteps <= chatTyped.length - 1) {
                chatSteps = chatSteps + 1;
                document.getElementById('chatInpt').value = chatTyped[chatSteps];
                if (chatSteps == chatTyped.length) {
                    document.getElementById('chatInpt').value = lastValue
                }
            }
        };
        if (keyEvent.keyCode === 27) {
            chatClose()
        };
        if (keyEvent.keyCode === 13) {
            chatText();
            chatClose()
        };
        
    });
    
    function chatText() {
        
        chatValue = document.getElementById('chatInpt').value;
        chatTyped.push(chatValue);
        
        if (chatValue[0] == '/') {
            if (!runChatCommand(chatValue)) {
                typeChat('[Ошибка] Неизвестная команда! Введите /help для просмотра доступных функций.')
            }
        };
        if (chatValue[0] != '/') {
            if (!zaprosFCaptchi) {
                nameChat = Math.floor(Math.random() * (5 - 1) + 1);
                idChat = Math.floor(Math.random() * (1001 - 1) + 1);
                nameC = 'Developer_Patcher';
                if (nameChat == 2) {
                    nameC = 'Teor_New'
                };
                if (nameChat == 3) {
                    nameC = 'Teor_Old'
                };
                if (nameChat == 4) {
                    nameC = 'Oleg_Vasilievich'
                };
                typeChat(nameC + '[' + idChat + '] говорит: ' + chatValue)
            }
        }
        
    }
    
    function chatOpen() {
        
        chatStatus = 1;
        if (captchaStatus) {
            setCaptchaPanelsVisible(false)
        };
        document.getElementById('chatInpt').style.display = 'block';
        document.getElementById('chatInpt').disabled = false;
        document.querySelector('#chatInpt').focus()
    }
    
    function chatClose() {
        
        if (captchaStatus) {
            setCaptchaPanelsVisible(true)
        };
        document.getElementById('chatInpt').style.display = 'none';
        document.getElementById('chatInpt').value = null;
        document.getElementById('chatInpt').disabled = true;
        chatStatus = 0;
        lastValue = 0;
        chatSteps = null
    }

    function chatStr() {
        chatStrValue = Math.floor(Math.random() * (6 - 1) + 1);
        chatIdRand = Math.floor(Math.random() * (1001 - 1) + 1);
        chatPhoneNumRand = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
        chatAIdRand = Math.floor(Math.random() * (1001 - 1) + 1);
        chatNameRand = Math.floor(Math.random() * (5 - 1) + 1);
        nameCHR = 'Developer_Patcher';
        let randomNames = [
            , ,
            'Teor_New',
            'Teor_Old',
            'Oleg_Vasilievich'
        ]
        nameCHR = randomNames[chatNameRand] ? randomNames[chatNameRand] : nameCHR
        chatNameAdminRand = Math.floor(Math.random() * (5 - 1) + 1);
        nameCHAR = 'Developer_Patcher';
        nameCHAR = randomNames[chatNameAdminRand] ? randomNames[chatNameAdminRand] : nameCHAR
        banValue = Math.floor(Math.random() * (8 - 1) + 1);
        banReason = 'пидорас';
        let banReasons = [
            , ,
            'читы',
            'лох',
            'ку от Павлова',
            'до выяснений',
            'телепорт',
            'бот'
        ]
        banReason = banReasons[banValue] ? banReasons[banValue] : banReason
        adValue = Math.floor(Math.random() * (16 - 1) + 1);
        adText = 'Куплю мозг. Цена договорная';
        let adValues = [
            , ,
            'Продам девственность. Звоните',
            'Куплю дом в г.Лас-Вентурас. Бюджет: 500.000',
            'Ищу девушку для с/о. О себе: большой',
            'Продам м/ц марки NGR-500 с пакетом ТТ. Цена договорная',
            'Продам дом возле больницы г.Лос-Сантос. Звоните',
            'Семья X Gang ищет родственников. Ждем вас у маяка.',
            'Продам дом  г.Сан-Фиерро с трех местным гаражом. Звоните',
            'Куплю автомобиль любой марки. Цена договорная',
            'Куплю а/с Бумбокс. Цена договорная',
            'Продам а/с Скейт.Цена 6.000.000',
            'Ищу друга с майкой Дискорд',
            'Идет набор в правительство. Ждем вас в холле',
            'Куплю бизнес любого типа. Звоните',
            'Продам бизнес Ларек. 20.000.000'
        ]
        adText = adValues[adValue] ? adValues[adValue] : adText
        vrValue = Math.floor(Math.random() * (16 - 1) + 1);
        vrText = 'Админы касагранде красавчики';
        let vrTexts = [
            , ,
            'Кто лох + в чат',
            '+',
            'Закупайтесь только в 24 7 ид 1337, самые высокие цены',
            'Какой дом слетел в тот пд?',
            'Куплю НРГ ТТ за 47к, звоните(чат не читаю)',
            'Идет набор в фаму. Все улучшения не куплены',
            'Оставьте бездомному дедульке немного денег и вам вернется в 10 раз больше',
            'Вы находились в долгом пути! Хочется покушать? Заезжайте к ларьку около якудзы(финдибиз 1337)',
            'скупаю на цр монетки по 9к',
            'Продам,либо обменяю газонокасилку тт нг 100кк торг',
            'Куплю НРГ ТТ . Бюджет 42кк',
            'Продам дом возле Автосалона СФ без гаража',
            'Аренда Лимузинов покатался верни обратно на Аренду порадуй Себя и Меня (желающих много)',
            'Хотите Сыграть В Орла Решку. То Едте В Бар 228, Ставки До 600К ( /Финдибиз 228 ).'
        ]
        vrText = vrTexts[vrValue] ? vrTexts[vrValue] : vrText
        textValue = Math.floor(Math.random() * (8 - 1) + 1);
        textText = 'qq';
        let textValues = [
            , ,
            'Х GANG the best',
            'Josip top',
            'Продам монетки!!!',
            'Куплю подарки',
            'Дайте денег пж',
            'Я акуленок туруруруру'
        ]
        textText = textValues[textValue] ? textValues[textValue] : textText
        if (chatStrValue == 1) {
            
            typeChat('Администратор ' + nameCHAR + '[' + chatAIdRand + '] забанил игрока ' + nameCHR + '[' + chatIdRand + '] на 30 дней. Причина: ' + banReason)
        };
        if (chatStrValue == 2) {
            
            typeChat('Объявление: ' + adText + '. Отправил: ' + nameCHR + '[' + chatIdRand + '] Тел.' + chatPhoneNumRand);
            typeChat('    Отредактировал сотрудник СМИ [ LS ] : ' + nameCHAR + '[' + chatAIdRand + ']')
        };
        if ((chatStrValue == 3) || (chatStrValue == 5)) {
            
            typeChat('[VIP] ' + nameCHR + '[' + chatIdRand + ']: ' + vrText)
        };
        if (chatStrValue == 4) {
            
            typeChat(nameCHR + '[' + chatIdRand + '] говорит: ' + textText)
        };
        if (chatGenerator == 1) {
            cZaderjka = Math.floor(Math.random() * (4000 - 1500) + 1500);
            
            setTimeout(chatStr, cZaderjka)
        }
    }
    
    function chatGen() {
        chatGenerator = chatGenerator ? 0 : 1;
        setSelected('chatGen', !!chatGenerator);
        typeChat(chatGenerator
            ? 'Генератор строк чата включен'
            : 'Генератор строк чата выключен');
        if (chatGenerator) {
            chatStr()
        }
    }
    
    function time() {
        timePlayed = Math.floor(Math.random() * (60 - 1) + 1);
        var currentDate = new Date();
        dHours = currentDate.getHours();
        dMin = currentDate.getMinutes();
        dDate = currentDate.getDate();
        dMonth = currentDate.getMonth();
        if (dMonth == 0) {
            dMonth = 'january'
        };
        if (dMonth == 1) {
            dMonth = 'february'
        };
        if (dMonth == 2) {
            dMonth = 'march'
        };
        if (dMonth == 3) {
            dMonth = 'april'
        };
        if (dMonth == 4) {
            dMonth = 'may'
        };
        if (dMonth == 5) {
            dMonth = 'june'
        };
        if (dMonth == 6) {
            dMonth = 'july'
        };
        if (dMonth == 7) {
            dMonth = 'august'
        };
        if (dMonth == 8) {
            dMonth = 'september'
        };
        if (dMonth == 9) {
            dMonth = 'october'
        };
        if (dMonth == 10) {
            dMonth = 'november'
        };
        if (dMonth == 11) {
            dMonth = 'december'
        };
        document.getElementsByClassName('month')[0].innerHTML = dDate + ' ' + dMonth;
        document.getElementsByClassName('hours')[0].innerHTML = dHours + ':' + dMin;
        document.getElementsByClassName('playedGreen')[0].innerHTML = timePlayed + ' min';
        document.getElementsByClassName('time')[0].style.display = 'block';
        setTimeout(() => {
            document.getElementsByClassName('time')[0].style.display = 'none';
        }, 5000)
    }
    
    function fakeCaptcha(fakeValue) {
        captchaFake = fakeValue;
        if (captchaFake != 0) {
            if ((captchaFake > 9999) && (captchaFake < 100000)) {
                fakeStatus = 1;
                fCaptcha = fakeValue;
                
            } else {
                
            }
        };
        if (!captchaFake) {
            
            fakeStatus = 0
        }
    }
    
    function payday() {
        document.body.style.background = '#454545';

        typeChat('');
        typeChat('________Банковский чек________');
        typeChat('');
        typeChat('Сумма к выплате: $0');
        typeChat('Текущая сумма в банке: $0');
        typeChat('______________________________');
        typeChat('');
        nameRand = Math.floor(Math.random() * (5 - 1) + 1);
        numberRand = Math.floor(Math.random() * (1025 - 1) + 1);
        classRand = Math.floor(Math.random() * (6 - 1) + 1);
        
        name = "Developer_Patcher";
        paydayAutoStatus = 1;
        reactionTimer = Date.now();


        paydayStatus = 1;
        paydayHelp = 0;
        document.getElementById('homeNotGos').style.display = 'none';
        document.getElementById('owner').innerHTML = name;
        document.getElementById('number').innerHTML = numberRand;
        document.getElementById('class').innerHTML = classRand;
        document.getElementById('numberG').innerHTML = numberRand;
        document.getElementById('classG').innerHTML = classRand;
        document.getElementById('homeGos').style.display = 'block';
        document.getElementById('payday').style.display = 'block';
        document.getElementsByClassName('time')[0].style.display = 'none';
        setTimeout(() => {
            document.getElementById('payday').style.display = 'none';
        }, 4000)
    }
    
    function paydayGo() {
        if (mode) {
            if (!paydayDone) {
                paydayDo = 0;
                paydayHelp = 1;
                
                zaderjka = Math.floor(Math.random() * (2500 - 900) + 900);
                setTimeout(payday, zaderjka);
                
                nStatus = 1;
                modeChange = 1;
                againPayday = 1;
                paydayDone = 1
            }
        }
    }
    
    function paydayOff() {
        
        paydayDone = 0;
        paydayStatus = 0;
        nStatus = 0;
        pressedN = 0;
        document.getElementById('homeNotGos').style.display = 'block';
        document.getElementById('homeGos').style.display = 'none';
        modeChange = 0;
        
        document.body.style.background = '#383838'
    }
    
    function firstTime() {
        let getInput = document.getElementById(_rId).value;
        inputLength = getInput.length;
        if (!firstSymbolStatus) {
            if (inputLength == 1) {
                if ((getInput > -1) && (getInput < 10)) {
                    firstSymbolStatus = 1;
                    firstSymbol = parseFloat(((Date.now() - firstSymbolTimer) / 1000).toFixed(3))
                }
            }
        }
    }
    
    function stopP() {
        if (mode == 1) {
            stopStatus = 1;
            
            paydayAutoStatus = 0;
            typeChat('Режим Payday остановлен');
            againPayday = 0;
            paydayDo = 1
        };
        if (mode == 2) {
            if (modeFcaptchaRequired) {
                modeFcaptchaRequired = 0;
                typeChat('Цикл остановлен');
                captchaClose(0);
            }
        }
        setSelected('modeP', false);
        setSelected('modeF', false); // lmao
        mode = 0;
        modeChange = 0;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // segments: a(top) b(top-right) c(bottom-right) d(bottom) e(bottom-left) f(top-left) g(middle)
    const SEGMENT_MAP = {
        '0': [1,1,1,1,1,1,0],
        '1': [0,1,1,0,0,0,0],
        '2': [1,1,0,1,1,0,1],
        '3': [1,1,1,1,0,0,1],
        '4': [0,1,1,0,0,1,1],
        '5': [1,0,1,1,0,1,1],
        '6': [1,0,1,1,1,1,1],
        '7': [1,1,1,0,0,0,0],
        '8': [1,1,1,1,1,1,1],
        '9': [1,1,1,1,0,1,1],
    };

    // swH=горизонтали(top/bottom), swL=левая сторона(f+e), swR=правая(b+c), swM=средняя
    // b и c всегда одного swR → единый вертикальный прямоугольник; то же для f+e
    function drawSegmentDigit(ctx, x, y, dW, dH, swH, swL, swR, swM, segs) {
        const mid  = Math.floor(dH / 2);
        const hswM = Math.floor(swM / 2);
        if (segs[0]) ctx.fillRect(x,        y,           dW,  swH);       // a top
        if (segs[1]) ctx.fillRect(x+dW-swR, y,           swR, mid+1);     // b top-right
        if (segs[2]) ctx.fillRect(x+dW-swR, y+mid,       swR, dH-mid);    // c bottom-right
        if (segs[3]) ctx.fillRect(x,        y+dH-swH,    dW,  swH);       // d bottom
        if (segs[4]) ctx.fillRect(x,        y+mid,       swL, dH-mid);    // e bottom-left
        if (segs[5]) ctx.fillRect(x,        y,           swL, mid+1);     // f top-left
        if (segs[6]) ctx.fillRect(x,        y+mid-hswM,  dW,  swM);       // g middle
    }

    function drawArzCaptcha(ctx, morgen) {
        const canvasW = ctx.canvas.width;
        const canvasH = ctx.canvas.height;
        // Рисуем в 4x меньшем разрешении, потом растягиваем с nearest-neighbor → pixel art
        const scale = 4;
        const offW  = Math.floor(canvasW / scale);
        const offH  = Math.floor(canvasH / scale);
        const off   = document.createElement('canvas');
        off.width   = offW;
        off.height  = offH;
        const octx  = off.getContext('2d');

        const digits  = morgen.toString();
        const n       = digits.length;
        const spacing = getRandomInt(1, 3);
        const margin  = 1;
        const dW      = Math.floor((offW - 2 * margin - (n - 1) * spacing) / n);
        const dH      = getRandomInt(offH - 2, offH);
        const startX  = margin;
        octx.fillStyle = '#222E39';
        for (let d = 0; d < n; d++) {
            const segs = SEGMENT_MAP[digits[d]];
            if (!segs) continue;
            const swBase = getRandomInt(Math.floor(dH / 8), Math.floor(dH / 5));
            const rnd    = () => Math.max(2, swBase + getRandomInt(-1, 2));
            const swH = rnd(), swL = rnd(), swR = rnd(), swM = rnd();
            const maxY   = Math.max(0, offH - dH);
            const yOff   = getRandomInt(0, maxY + 1);
            const xStart = startX + d * (dW + spacing);
            if (digits[d] === '1') {
                // центрируем палочку внутри бокса цифры
                octx.fillRect(xStart + Math.floor((dW - swR) / 2), yOff, swR, dH);
            } else {
                drawSegmentDigit(octx, xStart, yOff, dW, dH, swH, swL, swR, swM, segs);
            }
            if (Math.random() < 0.03) {
                octx.fillStyle = 'rgba(0,0,0,0.15)';
                octx.fillRect(xStart + getRandomInt(0, dW), yOff, 1, dH);
                octx.fillStyle = '#222E39';
            }
        }
        // Растягиваем без размытия → крупные пиксели
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(off, 0, 0, canvasW, canvasH);
    }
    
    function captchaOpen() {
        captchaLagWaiting = 0;
        captchaStatus = 1;
        modeChange = 1;
        captchaTimer = firstSymbolTimer = Date.now();
        if (paydayStatus && reactionTimer != -1) {
            reaction = parseFloat(((Date.now() - reactionTimer) / 1000).toFixed(3))
        }
        firstSymbolStatus = 0;
        // StartStop();
        if (fakeStatus == 1) {
            morgen = fCaptcha
        };
        if (fakeStatus == 0) {
            morgen = Math.floor(Math.random() * (100000 - 10000) + 10000)
        };
        if (!fakeStatus) {
            if (zeroCaptchaStatus) {
                morgen = Math.floor(Math.random() * (10000 - 1000) + 1000) * 10
            }
        };
        let ctx = document.getElementById('captchaCanvas').getContext('2d');
        if (oldCaptchaMode) {
            ctx.font = "normal 110px Arial"
            ctx.fillStyle = "#222E39";
            if (
                ctx.fillText !== original_CanvasRenderingContext2D_fillText
                || Function.prototype.toString.call(original_CanvasRenderingContext2D_fillText).includes('[native code]') === -1
            ) {
                alert('ебулрики, не лезьте блять в хсофт')
            } else {
                original_CanvasRenderingContext2D_fillText.call(ctx, morgen, getRandomInt(25, 45), 87)
            }
        } else {
            drawArzCaptcha(ctx, morgen);
        }
        setCaptchaPanelsVisible(true);
        document.getElementById(_rId).disabled = false;
        
        document.getElementById(_rId).focus();
        
    }

    function isScriptTampered() {
        let isTampered = false;
        try {
            if (!Function.prototype.call.toString().includes('[native code]')) isTampered = true;
            let descriptor = Object.getOwnPropertyDescriptor(Function.prototype, 'call');
            if (descriptor && descriptor.value && descriptor.value.toString().includes('apply')) isTampered = true;
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            if (Function.prototype.call.toString() !== iframe.contentWindow.Function.prototype.call.toString()) isTampered = true;
            document.body.removeChild(iframe);
        } catch (e) {}
        return isTampered;
    }
    
    function captchaClose(cType) {
        if (document.getElementById(_rId).type == "number")
            typeChat("[ВНИМАНИЕ] Последний ввод был осуществлен с читом \"только цифры\"");
            
        if (cType == 1) {
            if (isScriptTampered()) {
                typeChat("[ВНИМАНИЕ] Обнаружено вмешательство в скрипт сайта, возможен keyspoof");
            }
        }

        firstSymbolStatus = 0;
        modeChange = 0;
        captchaStatus = 0;
        captchaValid = 0;
        timeReact = '';
        let cValue = document.getElementById(_rId).value;
        let captchaTime = parseFloat(((Date.now() - captchaTimer) / 1000).toFixed(3))
        captchaData = cValue
        if (cType == 1) {
            captchaValid = (morgen+"" == captchaData)
        };
        setCaptchaPanelsVisible(false);
        document.getElementById(_rId).value = null;
        document.getElementById(_rId).disabled = true;

        let canvas = document.getElementById("captchaCanvas");
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mode == 1) {
            timeReact = ", открыта за " + reaction + "s";
            paydayOff();
            if (!stopStatus) {
                if (!paydayDo) {
                    paydayGo()
                }
            }
        };
        if (cType == 1) {
            let isRecord = false
            if (captchaValid) {
                if (captchaTime < captchaRecord || captchaRecord == -1) {
                    isRecord = true
                    captchaRecord = captchaTime
                    newRecordX()
                    recordArr.push(captchaRecord)
                }
            };
            localStorage.setItem("xxAllCaptcha", parseInt(localStorage.getItem("xxAllCaptcha") || 0) + 1);
            if (captchaValid) {
                localStorage.setItem("xxCounterInputs", parseInt(localStorage.getItem("xxCounterInputs") || 0) + 1);
                localStorage.setItem("xxCounterFirstSymb", parseInt(localStorage.getItem("xxCounterFirstSymb") || 0) + 1);
                localStorage.setItem("xxGoodCaptcha", parseInt(localStorage.getItem("xxGoodCaptcha") || 0) + 1);
                localStorage.setItem("xxAllInputs", parseFloat(localStorage.getItem("xxAllInputs") || .0) + captchaTime)
                localStorage.setItem("xxAllFirstSymb", parseFloat(localStorage.getItem("xxAllFirstSymb") || .0) + firstSymbol)
            
                document.getElementById("average").innerText = `Средний ввод: ${(localStorage.getItem("xxAllInputs") / localStorage.getItem("xxCounterInputs")).toFixed(3)}s`
                document.getElementById("averageFirstSymb").innerText = `Средний ввод первого символа: ${(localStorage.getItem("xxAllFirstSymb") / localStorage.getItem("xxCounterFirstSymb")).toFixed(3)}s`
            };
            document.getElementById("goodCaptcha").innerText = `Процент верных капч: ${Math.trunc((localStorage.getItem("xxGoodCaptcha") / localStorage.getItem("xxAllCaptcha")) * 100)}%`
            typeChat((isRecord ? "[РЕКОРД] " : "") + "Капча введена " + (captchaValid ? "" : "не") + "верно (" + morgen + '|' + captchaData + ') за ' + captchaTime + "s (первый символ: " + (firstSymbol != 0 ? firstSymbol + "s" : "нет") + (mode == 1 ? timeReact : "") + ")");
        }

        firstSymbol = 0
        timeReact = "";
        if (mode == 2) {
            if (modeFcaptchaRequired) {
                captchaOpen()
            }
        }
    }
    var ball = document.getElementById('houseSale');
    ball.onmousedown = function(mouseEvent) {
        var ballCoords = getCoords(ball);
        var shiftX = mouseEvent.pageX - ballCoords.left;
        var shiftY = mouseEvent.pageY - ballCoords.top;
        ball.style.position = 'absolute';
        document.body.appendChild(ball);
        moveAt(mouseEvent);
        ball.style.zIndex = -1;
    
        function moveAt(mouseEvent) {
            ball.style.left = mouseEvent.pageX - shiftX + 'px';
            ball.style.top = mouseEvent.pageY - shiftY + 'px'
        }
        document.onmousemove = function(mouseEvent) {
            moveAt(mouseEvent);
            document.getElementById('notice').style.display = 'none'
        };
        ball.onmouseup = function() {
            document.onmousemove = null;
            ball.onmouseup = null
        }
    };
    
    function getCoords(element) {
        var box = element.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        }
    }
    
    function click(mouseEvent) {
        if (document.all) {
            if (event.button == 2) {
                return false
            }
        };
        if (document.layers) {
            if (mouseEvent.which == 3) {
                return false
            }
        }
    }
    if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN)
    };
    document.onmousedown = click;
    document.oncontextmenu = function(mouseEvent) {
        return false
    };
    
    function controlHide() {
        document.getElementById('control').style.display = 'none';
        document.getElementById('openControl').style.display = 'block'
    }
    
    function controlOpen() {
        document.getElementById('control').style.display = 'block';
        document.getElementById('openControl').style.display = 'none'
    }
    
    let _rId = 'id_' + Math.random().toString(36).substr(2, 9);

    window.onload = () => {
        let container = document.getElementById('c_enter');
        if (container) {
            let realInput = document.createElement('input');
            realInput.type = "text";
            realInput.name = "text";
            realInput.className = "c_inpt";
            realInput.id = _rId;
            realInput.autocomplete = "off";
            realInput.disabled = true;
            container.insertBefore(realInput, document.getElementById('send'));
        }

        document.getElementById('openControl').onclick = controlOpen;
        document.getElementById('hideControl').onclick = controlHide;
        document.getElementById('modeN').onclick = modeN;
        document.getElementById('modeP').onclick = modeP;
        document.getElementById('enableCam').onclick = enableCamC;
        document.getElementById('modeF').onclick = modeF;
        document.getElementById('stopP').onclick = stopP;
        document.getElementById('captchaLag').onclick = captchaLag;
        document.getElementById('chatGen').onclick = chatGen;
        document.getElementById('changeKey').onclick = changeKey;
        document.getElementById('send').onclick = function() { captchaClose(1) };
        document.getElementById('cancel').onclick = function() { captchaClose(0) };
        document.getElementById('oldCaptchaToggle').onclick = function() {
            oldCaptchaMode = !oldCaptchaMode;
            document.getElementById('oldCaptchaToggle').classList.toggle('btnSelected', oldCaptchaMode);
            typeChat('Режим старой капчи ' + (oldCaptchaMode ? 'включен' : 'выключен'));
        };

        document.getElementById("goodCaptcha").innerText = `Процент верных капч: ${Math.trunc(((localStorage.getItem("xxGoodCaptcha") || 0) / (localStorage.getItem("xxAllCaptcha") || 1)) * 100)}%`
        document.getElementById("average").innerText = `Средний ввод: ${((localStorage.getItem("xxAllInputs") || 0) / (localStorage.getItem("xxCounterInputs") || 1)).toFixed(3)}s`
        document.getElementById("averageFirstSymb").innerText = `Средний ввод первого символа: ${((localStorage.getItem("xxAllFirstSymb") || 0) / (localStorage.getItem("xxCounterFirstSymb") || 1)).toFixed(3)}s`

        document.addEventListener('keyup', function(mouseEvent) {
            let blockedKeys = [17, 16, 20, 9, 8, 27, 32, 91, 18, 78]
            if (changedKeyCodeNeed) {
                changedKeyCodeNeed = 0;
                if (blockedKeys.indexOf(event.keyCode) === -1) {
                    changedKeyCode = event.keyCode;
                    typeChat('Кнопка открытия капчи была изменена (' + event.key + '), также открыть капчу можно нажатием на N');
                    typeChat('При обновлении страницы все настройки будут сброшены, также вернуть все к настройкам по умолчанию можно командой /key');
                    openCaptchaKeyOne = changedKeyCode
                } else {
                    typeChat('Неверная клавиша, попробуйте еще раз');
                    typeChat('Запрещены: ALT, CTRL, SHIFT, WIN, SPACE, ESC, BACKSPACE, CAPSLOCK, TAB, N');
                }
            };
            if ((event.keyCode === openCaptchaKeyOne) || (event.keyCode === openCaptchaKeyTwo)) { 
                key = 'n';
                if (event.keyCode == 115) {
                    key = 'f4'
                };
                if ((!chatStatus) && (!captchaStatus)) {
                    
                    if (mode == 0) {
                        document.getElementById('chatInpt').disabled = false;
                        captchaLagged();
                    };
                    if (mode == 1) {
                        if ((!paydayStatus) && (!paydayHelp)) {
                            if (!paydayAutoStatus) {
                                paydayGo()
                            }
                        };
                        if (paydayStatus) {
                            document.getElementById('chatInpt').disabled = false;
                            // reaction = readout;
                            // StartStop();
                            
                            
                            captchaLagged();
                        } else {
                            if (nStatus) {
                                if (pressedN > -1) {
                                    variant = Math.floor(Math.random() * (4 - 1) + 1);
                                    
                                    if (variant != 3) {
                                        typeChat('[Ошибка] Не флуди!')
                                    };
        
                                    if (variant == 3) {
                                        typeChat('[Ошибка] Этот дом уже куплен!')
                                    }
                                };
                                pressedN = pressedN + 1
                            };
                        }
                    };
                    if (mode == 2) {
                        if (!modeFcaptchaRequired) {
                            captchaOpen();
                            modeFcaptchaRequired = 1
                        }
                    }
                }
            };
            if ((event.keyCode === 84) && (captchaStatus == 0)) {
                if (!chatStatus) {
                    
                    chatOpen()
                }
            }
        })

        document.getElementsByClassName("typeDiv")[0].onkeyup = (e) => {
            if (captchaStatus == 1) {
                if (event.keyCode === 13)
                    captchaClose(1);
                else if (event.keyCode === 27)
                    captchaClose(0);
            }
        }

        document.getElementById(_rId).oninput = firstTime;

        String.prototype.slice = () => "cheat";
        String.prototype.replace = () => "cheat";

        modeN();
    }
})()

