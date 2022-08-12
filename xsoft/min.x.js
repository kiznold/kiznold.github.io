// ORIGINAL CODE - JOSIP
// MODIFIED BY - vk.com/kizzn

// уебки не лезьте сюда

(function() {
    let chatStatus = 0;
    let captchaStatus = 0;
    let morgen = 0;
    let fakeStatus = 0;
    let fCaptcha = 0;
    let mode = 0;
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
    let preloaderStatus = 1;
    let zaprosFCaptchi = 0;
    let chatGenerator = 0;
    let chatTyped = [];
    let lastValue = 0;
    let chatSteps = null;
    let changedKey = 0;
    let changedKeyCode = 0;
    let changedKeyName = 0;
    let changedKeyCodeNeed = 0;
    let keyClicked = 0;
    let validKey = 0;
    let openCaptchaKeyOne = 115;
    let openCaptchaKeyTwo = 78;
    let modeFcaptchaRequired = 0;
    let rds = 0;
    let rms = 0;
    let record = 0;
    let recordArr = [];
    let captchaLagStatus = 0;
    let captchaLagHelp = 0;
    let captchaLagWaiting = 0;
    let zeroCaptchaStatus = 0;
    let zeroCaptchaHelp = 0;
    let captchaMinSize = 90;
    let captchaMaxSize = 140;
    
    
    function newRecordX() {
        typeChat('Новый рекорд!!!');
        document.getElementById('headlineControl').innerText = 'Control [' + readout + 's]';
        document['getElementById']('record')['style']['display'] = 'block';
        document['getElementById']('recordS')['innerHTML'] = readout + 's';
        setTimeout(() => {
            document.getElementById('record').style.display = 'none';
        }, 1500)
    }
    
    function typeChat(text) {
        document['getElementById']('chatArea')['value'] = document['getElementById']('chatArea')['value'] + text + '\x0A';
        document['getElementById']('chatArea')['scrollTop'] = 450000 * 100 * 3;
    }
    
    function changeKey() {
        typeChat('Нажмите на клавиатуре клавишу, на которую желаете заменить');
        changedKeyCodeNeed = 1;
        validKey = 0;
        $(document)['keyup'](function(_0xb162x8) {
            keyClicked = 1;
            let blockedKeys = [17, 16, 20, 9, 8, 27, 32, 91, 18, 78]
            if (changedKeyCodeNeed) {
                changedKeyCodeNeed = 0;
                if (blockedKeys.indexOf(event.keyCode) === -1) {
                    changedKeyCode = event['keyCode'];
                    changedKeyName = event['key'];
                    changedKey = 1;
                    validKey = 1;
                    typeChat('Кнопка открытия капчи была изменена (' + event['key'] + '), также открыть капчу можно нажатием на N');
                    typeChat('При обновлении страницы все настройки будут сброшены, также вернуть все к настройкам по умолчанию можно командой /key');
                    openCaptchaKeyOne = changedKeyCode
                }
            };
            changedKeyCodeNeed = 0;
            if (!validKey) {
                typeChat('Неверная клавиша, попробуйте еще раз');
                typeChat('Запрещены: ALT, CTRL, SHIFT, WIN, SPACE, ESC, BACKSPACE, CAPSLOCK, TAB, N');
                validKey = 1
            }
        })
    }
    
    function modeN() {
        if (!modeChange) {
            if (!chatGenerator) {
                document['getElementById']('chatGen')['style']['display'] = 'none';
                document['getElementById']('stopP')['style']['display'] = 'none';
                document['getElementById']('modeN')['classList']['add']('btnSelected');
                if (mode) {
                    document['getElementById']('modeP')['classList']['remove']('btnSelected')
                };
                if (mode == 2) {
                    document['getElementById']('modeF')['classList']['remove']('btnSelected')
                };
                typeChat('Включен ручной режим ввода капчи, для открытия капчи нажмите N,F4 или же напишите в чат /buybiz (открыть чат на Т англ)');
                typeChat('Внимание! Официальными доменами сайта являются: kiznold.github.io, k1zn.rinki.cc')
                mode = 0;
                document['getElementById']('houseSale')['style']['display'] = 'none'
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
            paydayAutoStatus = 0;
            document['getElementById']('chatGen')['style']['display'] = 'inline-block';
            document['getElementById']('stopP')['style']['display'] = 'inline-block';
            document['getElementById']('modeP')['classList']['add']('btnSelected');
            if (!mode) {
                document['getElementById']('modeN')['classList']['remove']('btnSelected')
            };
            if (mode == 2) {
                document['getElementById']('modeF')['classList']['remove']('btnSelected')
            };
            typeChat('Включен режим Payday, для начала нажмите N или F4, пейдей будет через 0.9-2с, для остановки нажмите кнопку Stop');
            mode = 1;
            document['getElementById']('houseSale')['style']['display'] = 'block'
        } else {
            
            typeChat('Ошибка переключения режимов, закройте окно с капчей')
        }
    }
    
    function modeF() {
        if (!modeChange) {
            if (!chatGenerator) {
                if (captchaLagStatus == 1) {
                    captchaLag()
                };
                document['getElementById']('chatGen')['style']['display'] = 'none';
                document['getElementById']('stopP')['style']['display'] = 'inline-block';
                document['getElementById']('modeF')['classList']['add']('btnSelected');
                if (!mode) {
                    document['getElementById']('modeN')['classList']['remove']('btnSelected')
                };
                if (mode) {
                    document['getElementById']('modeP')['classList']['remove']('btnSelected')
                };
                mode = 2;
                document['getElementById']('houseSale')['style']['display'] = 'none';
                
                typeChat('Включен режим зацикленной капчи. Для начала нажмите N, после ввода капчи сразу же откроется новая')
            }
        } else {
            
            typeChat('Ошибка переключения режимов, закройте окно с капчей или нажмите кнопку Stop')
        }
    }
    
    function captchaLag() {
        if (mode < 2) {
            if (!captchaLagHelp) {
                if (captchaLagStatus) {
                    captchaLagStatus = 0;
                    captchaLagHelp = 1;
                    typeChat('Выключен режим лагов капчи(симуляция пинга)');
                    document['getElementById']('captchaLag')['classList']['remove']('btnSelected')
                }
            };
            if (!captchaLagHelp) {
                if (!captchaLagStatus) {
                    captchaLagStatus = 1;
                    captchaLagHelp = 1;
                    typeChat('Включен режим лагов капчи(симуляция пинга)');
                    document['getElementById']('captchaLag')['classList']['add']('btnSelected')
                }
            };
            captchaLagHelp = 0
        } else {
            typeChat('Ошибка режимов');
            
        }
    }
    
    function captchaLagged() {
        if (!captchaLagWaiting) {
            if (captchaLagStatus) {
                captchaOpenDelay = Math['floor'](Math['random']() * (250 - 10) + 10);
                
                setTimeout(captchaOpen, captchaOpenDelay);
                captchaLagWaiting = 1
            }
        };
        if (!captchaLagStatus) {
            captchaOpen()
        }
    }
    
    function zeroCaptchaX() {
        if (!zeroCaptchaHelp) {
            if (zeroCaptchaStatus) {
                zeroCaptchaStatus = 0;
                zeroCaptchaHelp = 1;
                typeChat('Капча с окончанием на 0 выключена');
                
            }
        };
        if (!zeroCaptchaHelp) {
            if (!zeroCaptchaStatus) {
                zeroCaptchaStatus = 1;
                zeroCaptchaHelp = 1;
                typeChat('Капча с окончанием на 0 включена');
                
            }
        };
        zeroCaptchaHelp = 0
    }
    
    document['getElementById']('megasuperbebra')['addEventListener']('keyup', function(event) {
        event['preventDefault']();
        if ((event['keyCode'] === 13) && (chatStatus == 0)) {
            document['getElementById']('send')['click']();
            
            
            captchaClose(1)
        };
        if ((event['keyCode'] === 27) && (chatStatus == 0)) {
            document['getElementById']('cancel')['click']();
            
            captchaClose(0)
        }
    });
    
    $(document)['keyup'](function(_0xb162x8) {
        if ((event['keyCode'] === openCaptchaKeyOne) || (event['keyCode'] === openCaptchaKeyTwo)) {
            if (preloaderStatus == 0) {
                key = 'n';
                if (event['keyCode'] == 115) {
                    key = 'f4'
                };
                if ((!chatStatus) && (!captchaStatus)) {
                    
                    if (mode == 0) {
                        document['getElementById']('chatInpt')['disabled'] = false;
                        captchaLagged();
                    };
                    if (mode == 1) {
                        if ((!paydayStatus) && (!paydayHelp)) {
                            if (!paydayAutoStatus) {
                                paydayGo()
                            }
                        };
                        if (nStatus) {
                            if (pressedN > -1) {
                                variant = Math['floor'](Math['random']() * (4 - 1) + 1);
                                
                                if (variant != 3) {
                                    typeChat('[Ошибка] Не флуди!')
                                };
                                if (variant == 3) {
                                    typeChat('[Ошибка] Этот дом уже куплен!')
                                }
                            };
                            pressedN = pressedN + 1
                        };
                        if (paydayStatus) {
                            document['getElementById']('chatInpt')['disabled'] = false;
                            reaction = readout;
                            StartStop();
                            
                            
                            captchaLagged();
                        }
                    };
                    if (mode == 2) {
                        if (!modeFcaptchaRequired) {
                            captchaOpen();
                            modeFcaptchaRequired = 1
                        }
                    }
                }
            }
        };
        if ((event['keyCode'] === 84) && (captchaStatus == 0)) {
            if (!preloaderStatus) {
                if (!chatStatus) {
                    
                    chatOpen()
                }
            }
        }
    });
    var checkv = document['getElementById']('chatInpt')['addEventListener']('keyup', function(_0xb162x10) {
        _0xb162x10['preventDefault']();
        if (_0xb162x10['keyCode'] === 38) {
            if (chatSteps == null) {
                lastValue = document['getElementById']('chatInpt')['value'];
                chatSteps = chatTyped['length']
            };
            if (chatSteps > 0) {
                chatSteps = chatSteps - 1
            };
            
            if (chatTyped['length'] > 0) {
                document['getElementById']('chatInpt')['value'] = chatTyped[chatSteps]
            }
        };
        if (_0xb162x10['keyCode'] === 40) {
            
            if (chatSteps <= chatTyped['length'] - 1) {
                chatSteps = chatSteps + 1;
                document['getElementById']('chatInpt')['value'] = chatTyped[chatSteps];
                if (chatSteps == chatTyped['length']) {
                    document['getElementById']('chatInpt')['value'] = lastValue
                }
            }
        };
        if (_0xb162x10['keyCode'] === 27) {
            chatClose()
        };
        if (_0xb162x10['keyCode'] === 13) {
            chatText();
            chatClose()
        };
        
    });
    
    function chatText() {
        
        chatValue = document['getElementById']('chatInpt')['value'];
        chatTyped['push'](chatValue);
        
        if (chatValue[0] == '/') {
            commandValid = 0;
            if (chatValue == '/time') {
                
                time();
                commandValid = 1
            };
            if (chatValue == '/help') {
                
                typeChat('');
                typeChat('/help - помощь по командам');
                typeChat('/buybiz - купить бизнес(открыть капчу командой)');
                typeChat('/key - сбросить клавиши открытия капчи');
                typeChat('/about - о создателе');
                typeChat('/contact - контакты');
                typeChat('/record - рекорды');
                typeChat('/clear - очистить чат');
                typeChat('/zero  - последняя цифра капчи 0');
                typeChat('');
                commandValid = 1
            };
            if (chatValue == '/clear') {
                
                for (var _0xb162x13 = 0; _0xb162x13 < 9; _0xb162x13++) {
                    typeChat('')
                };
                commandValid = 1
            };
            if (chatValue == '/zero') {
                
                zeroCaptchaX();
                commandValid = 1
            };
            if (chatValue == '/about') {
                
                typeChat('Сайт сделан JOsip(Teor_New) для тренировки капчи, играю на Brainburg');
                commandValid = 1
            };
            if (chatValue == '/record') {
                
                if (record) {
                    typeChat('Рекорды:');
                    if (recordArr['length'] < 3) {
                        typeChat(recordArr[recordArr['length'] - 1])
                    };
                    if (recordArr['length'] >= 3) {
                        typeChat('1) ' + recordArr[recordArr['length'] - 1]);
                        typeChat('2) ' + recordArr[recordArr['length'] - 2]);
                        typeChat('3) ' + recordArr[recordArr['length'] - 3])
                    }
                };
                if (!record) {
                    typeChat('Рекордов еще нету!')
                };
                commandValid = 1
            };
            if (chatValue == '/contact') {
                
                typeChat('Группа ВК - vk.com/xgangsoft');
                typeChat('Страница ВК - vk.com/alexander_1919');
                commandValid = 1
            };
            if (chatValue == '/key') {
                
                typeChat('Клавиши открытия капчи были сброшены, открыть капчу можно нажатием F4 или N');
                openCaptchaKeyOne = 115;
                commandValid = 1
            };
            if (chatValue == '/buybiz') {
                if (mode == 0) {
                    
                    captchaLagged()
                };
                if (mode == 1) {
                    if (paydayStatus) {
                        
                        captchaLagged()
                    };
                    if (!paydayStatus) {
                        typeChat('Сначала активируйте режим нажатием N')
                    }
                } else {
                    typeChat('Данная команда доступна исключительно в режиме N');
                    
                };
                commandValid = 1
            };
            if (commandValid == 0) {
                typeChat('[Ошибка] Неизвестная команда! Введите /help для просмотра доступных функций.')
            }
        };
        if (chatValue[0] != '/') {
            if (!zaprosFCaptchi) {
                nameChat = Math['floor'](Math['random']() * (5 - 1) + 1);
                idChat = Math['floor'](Math['random']() * (1001 - 1) + 1);
                nameC = 'Alexey_Goldromanov';
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
            document['getElementsByClassName']('captchaDiv')[0]['style']['display'] = 'none';
            document['getElementsByClassName']('typeDiv')[0]['style']['display'] = 'none'
        };
        document['getElementById']('chatInpt')['style']['display'] = 'block';
        document['getElementById']('chatInpt')['disabled'] = false;
        $('#chatInpt')['focus']()
    }
    
    function chatClose() {
        
        if (captchaStatus) {
            document['getElementsByClassName']('captchaDiv')[0]['style']['display'] = 'block';
            document['getElementsByClassName']('typeDiv')[0]['style']['display'] = 'block'
        };
        document['getElementById']('chatInpt')['style']['display'] = 'none';
        document['getElementById']('chatInpt')['value'] = null;
        document['getElementById']('chatInpt')['disabled'] = true;
        chatStatus = 0;
        lastValue = 0;
        chatSteps = null
    }
    var base = 60;
    var clocktimer, dateObj, dh, dm, ds, ms;
    var readout = '';
    var h = 1,
        m = 1,
        tm = 1,
        s = 0,
        ts = 0,
        ms = 0,
        init = 0;
    
    function ClearСlock() {
        clearTimeout(clocktimer);
        h = 1;
        m = 1;
        tm = 1;
        s = 0;
        ts = 0;
        ms = 0;
        init = 0;
        readout = '00:00:00'
    }
    
    function StartTIME() {
        var _0xb162x26 = new Date();
        var _0xb162x27 = (_0xb162x26['getTime']() - dateObj['getTime']()) - (s * 1000);
        if (_0xb162x27 > 999) {
            s++
        };
        if (s >= (m * base)) {
            ts = 0;
            m++
        } else {
            ts = parseInt((ms / 100) + s);
            if (ts >= base) {
                ts = ts - ((m - 1) * base)
            }
        };
        if (m > (h * base)) {
            tm = 1;
            h++
        } else {
            tm = parseInt((ms / 100) + m);
            if (tm >= base) {
                tm = tm - ((h - 1) * base)
            }
        };
        ms = Math['round'](_0xb162x27 / 10);
        if (ms > 99) {
            ms = 0
        };
        if (ms == 0) {
            ms = '00'
        };
        if (ms > 0 && ms <= 9) {
            ms = '0' + ms
        };
        if (ts > 0) {
            ds = ts
        } else {
            ds = '00'
        };
        dm = tm - 1;
        if (dm > 0) {
            if (dm < 10) {
                dm = '0' + dm
            }
        } else {
            dm = '00'
        };
        dh = h - 1;
        if (dh > 0) {
            if (dh < 10) {
                dh = '0' + dh
            }
        } else {
            dh = '00'
        };
        readout = ds + ':' + ms;
        clocktimer = setTimeout(StartTIME, 1)
    }
    
    function StartStop() {
        if (!init) {
            ClearСlock();
            dateObj = new Date();
            StartTIME();
            init = 1
        } else {
            clearTimeout(clocktimer);
            init = 0
        }
    }
    
    function chatStr() {
        chatStrValue = Math['floor'](Math['random']() * (6 - 1) + 1);
        chatIdRand = Math['floor'](Math['random']() * (1001 - 1) + 1);
        chatPhoneNumRand = Math['floor'](Math['random']() * (10000000 - 1000000) + 1000000);
        chatAIdRand = Math['floor'](Math['random']() * (1001 - 1) + 1);
        chatNameRand = Math['floor'](Math['random']() * (5 - 1) + 1);
        nameCHR = 'Alexey_Goldromanov';
        let randomNames = [
            , ,
            'Teor_New',
            'Teor_Old',
            'Oleg_Vasilievich'
        ]
        nameCHR = randomNames[chatNameRand] ? randomNames[chatNameRand] : nameCHR
        chatNameAdminRand = Math['floor'](Math['random']() * (5 - 1) + 1);
        nameCHAR = 'Alexey_Goldromanov';
        nameCHAR = randomNames[chatNameAdminRand] ? randomNames[chatNameAdminRand] : nameCHAR
        banValue = Math['floor'](Math['random']() * (8 - 1) + 1);
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
        adValue = Math['floor'](Math['random']() * (16 - 1) + 1);
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
        vrValue = Math['floor'](Math['random']() * (16 - 1) + 1);
        vrText = 'Админы пидорасы';
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
        textValue = Math['floor'](Math['random']() * (8 - 1) + 1);
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
            cZaderjka = Math['floor'](Math['random']() * (4000 - 1500) + 1500);
            
            setTimeout(chatStr, cZaderjka)
        }
    }
    
    function chatGen() {
        chatGenStatus = 0;
        if (!chatGenStatus) {
            if (!chatGenerator) {
                typeChat('Генератор строк чата включен');
                chatGenerator = 1;
                
                chatGenStatus = 1;
                document['getElementById']('chatGen')['classList']['add']('btnSelected');
                chatStr()
            }
        };
        if (!chatGenStatus) {
            if (chatGenerator) {
                typeChat('Генератор строк чата выключен');
                chatGenerator = 0;
                
                chatGenStatus = 1;
                
                document['getElementById']('chatGen')['classList']['remove']('btnSelected')
            }
        };
        chatGenStatus = 0
    }
    
    function time() {
        timePlayed = Math['floor'](Math['random']() * (60 - 1) + 1);
        var _0xb162x2e = new Date();
        dHours = _0xb162x2e['getHours']();
        dMin = _0xb162x2e['getMinutes']();
        dDate = _0xb162x2e['getDate']();
        dMonth = _0xb162x2e['getMonth']();
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
        document['getElementsByClassName']('month')[0]['innerHTML'] = dDate + ' ' + dMonth;
        document['getElementsByClassName']('hours')[0]['innerHTML'] = dHours + ':' + dMin;
        document['getElementsByClassName']('playedGreen')[0]['innerHTML'] = timePlayed + ' min';
        document['getElementsByClassName']('time')[0]['style']['display'] = 'block';
        setTimeout(() => {
            document.getElementsByClassName('time')[0].style.display = 'none';
        }, 5000)
    }
    
    function fakeCaptcha(_0xb162x30) {
        captchaFake = _0xb162x30;
        if (captchaFake != 0) {
            if ((captchaFake > 9999) && (captchaFake < 100000)) {
                fakeStatus = 1;
                fCaptcha = _0xb162x30;
                
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
        nameRand = Math['floor'](Math['random']() * (5 - 1) + 1);
        numberRand = Math['floor'](Math['random']() * (1025 - 1) + 1);
        classRand = Math['floor'](Math['random']() * (6 - 1) + 1);
        
        name = "Alexey_Goldromanov";
        paydayAutoStatus = 1;
        StartStop();
        
        
        paydayStatus = 1;
        paydayHelp = 0;
        document['getElementById']('homeNotGos')['style']['display'] = 'none';
        document['getElementById']('owner')['innerHTML'] = name;
        document['getElementById']('number')['innerHTML'] = numberRand;
        document['getElementById']('class')['innerHTML'] = classRand;
        document['getElementById']('numberG')['innerHTML'] = numberRand;
        document['getElementById']('classG')['innerHTML'] = classRand;
        document['getElementById']('homeGos')['style']['display'] = 'block';
        document['getElementById']('payday')['style']['display'] = 'block';
        document['getElementsByClassName']('time')[0]['style']['display'] = 'none';
        setTimeout(() => {
            document.getElementById('payday').style.display = 'none';
        }, 4000)
    }
    
    function paydayGo() {
        if (mode) {
            if (!paydayDone) {
                paydayDo = 0;
                paydayHelp = 1;
                
                zaderjka = Math['floor'](Math['random']() * (2500 - 900) + 900);
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
        document['getElementById']('homeNotGos')['style']['display'] = 'block';
        document['getElementById']('homeGos')['style']['display'] = 'none';
        modeChange = 0;
        
        document.body.style.background = '#383838'
    }
    
    function firstTime() {
        getInput = document['getElementById']('megasuperbebra')['value'];
        inputLenght = getInput['length'];
        if (!firstSymbolStatus) {
            if (inputLenght == 1) {
                if ((getInput > -1) && (getInput < 10)) {
                    firstSymbolStatus = 1;
                    firstSymbol = readout;
                    
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
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }
    
    function captchaOpen() {
        captchaLagWaiting = 0;
        modeChange = 1;
        captchaStatus = 1;
        StartStop();
        if (fakeStatus == 1) {
            morgen = fCaptcha
        };
        if (fakeStatus == 0) {
            morgen = Math['floor'](Math['random']() * (100000 - 10000) + 10000)
        };
        if (!fakeStatus) {
            if (zeroCaptchaStatus) {
                morgen = Math['floor'](Math['random']() * (10000 - 1000) + 1000) * 10
            }
        };
        let ctx = document.getElementById('captchaCanvas').getContext('2d');
        ctx.font = "normal 110px Arial"
        ctx.fillStyle = "#222E39";
        ctx.fillText(morgen, getRandomInt(25, 45), 87)
        document['getElementsByClassName']('captchaDiv')[0]['style']['display'] = 'block';
        document['getElementsByClassName']('typeDiv')[0]['style']['display'] = 'block';
        document['getElementById']('megasuperbebra')['disabled'] = false;
        
        document['getElementById']('megasuperbebra')['focus']();
        
    }
    
    function captchaClose(_0xb162x3a) {
        
        firstSymbolStatus = 0;
        modeChange = 0;
        captchaType = _0xb162x3a;
        StartStop();
        captchaStatus = 0;
        captchaValid = 0;
        timeReact = '';
        let cValue = document['getElementById']('megasuperbebra')['value'];
        captchaData = (isNaN(cValue * 1) || cValue === '') ? 'Ничего' : cValue * 1;
        if (captchaType == 1) {
            if (morgen == captchaData) {
                
                captchaValid = 1
    
                if (document.onkeydown) location.href = 'https://y' + 'ou' + 'tu' + 'b' + 'e.' + 'c' + 'o' + 'm' + '/wa' + 'tc' + 'h?v' + '=d' + 'Q' + 'w' + '4' + 'w' + '9' + 'W' + 'g' + 'X' + 'c' + 'Q';
            };
            if (morgen != captchaData) {
                
                captchaValid = 0
            }
        };
        document['getElementsByClassName']('captchaDiv')[0]['style']['display'] = 'none';
        document['getElementsByClassName']('typeDiv')[0]['style']['display'] = 'none';
        document['getElementById']('megasuperbebra')['value'] = null;
        document['getElementById']('megasuperbebra')['disabled'] = true;

        let canvas = document.getElementById("captchaCanvas");
        let ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (mode == 1) {
            timeReact = '. Капча открыта за ' + reaction + '.';
            paydayOff();
            if (!stopStatus) {
                if (!paydayDo) {
                    
                    paydayGo()
                }
            }
        };
        if (captchaValid) {
            /*let reklama = Math.floor(Math.random() * (10 - 1) + 1);
            if (reklama == 3) {
                document['getElementById']('chatArea')['value'] = document['getElementById']('chatArea')['value'] + "Вы можете заказать любой скрипт по вашему усмотрению для RakBot или GTA:SA. Подробнее в конце сайта (СКРИПТЫ НА ЗАКАЗ)\n";
            };*/
            typeChat('Капча введена (' + morgen + '|' + captchaData + ') за ' + readout + timeReact + ' Первый символ был введен за ' + firstSymbol);
            if (record) {
                if (ds < rds) {
                    
                    recordArr['push'](readout);
                    rms = ms;
                    rds = ds;
                    newRecordX()
                };
                if (ds == rds) {
                    if (ms < rms) {
                        
                        recordArr['push'](readout);
                        rms = ms;
                        rds = ds;
                        newRecordX()
                    }
                }
            };
            if (!record) {
                record = 1;
                rms = ms;
                rds = ds
            }
        };
        if (!captchaValid) {
            //console.log(morgen)
            typeChat('Капча введена неверно (' + morgen + '|' + captchaData + ') за ' + readout + timeReact)
    
        };
        
        timeReact = '';
        if (mode == 2) {
            if (modeFcaptchaRequired) {
                
                captchaOpen()
            }
        }
    }
    var ball = document['getElementById']('houseSale');
    ball['onmousedown'] = function(_0xb162x8) {
        var _0xb162x3c = getCoords(ball);
        var _0xb162x3d = _0xb162x8['pageX'] - _0xb162x3c['left'];
        var _0xb162x3e = _0xb162x8['pageY'] - _0xb162x3c['top'];
        ball['style']['position'] = 'absolute';
        document['body']['appendChild'](ball);
        _0xb162x3f(_0xb162x8);
        ball['style']['zIndex'] = -1;
    
        function _0xb162x3f(_0xb162x8) {
            ball['style']['left'] = _0xb162x8['pageX'] - _0xb162x3d + 'px';
            ball['style']['top'] = _0xb162x8['pageY'] - _0xb162x3e + 'px'
        }
        document['onmousemove'] = function(_0xb162x8) {
            _0xb162x3f(_0xb162x8);
            document['getElementById']('notice')['style']['display'] = 'none'
        };
        ball['onmouseup'] = function() {
            document['onmousemove'] = null;
            ball['onmouseup'] = null
        }
    };
    
    function getCoords(_0xb162x41) {
        var _0xb162x42 = _0xb162x41['getBoundingClientRect']();
        return {
            top: _0xb162x42['top'] + pageYOffset,
            left: _0xb162x42['left'] + pageXOffset
        }
    }
    
    function click(_0xb162x8) {
        if (document['all']) {
            if (event['button'] == 2) {
                return false
            }
        };
        if (document['layers']) {
            if (_0xb162x8['which'] == 3) {
                return false
            }
        }
    }
    if (document['layers']) {
        document['captureEvents'](Event.MOUSEDOWN)
    };
    document['onmousedown'] = click;
    document['oncontextmenu'] = function(_0xb162x8) {
        return false
    };
    
    function controlHide() {
        document['getElementById']('control')['style']['display'] = 'none';
        document['getElementById']('openControl')['style']['display'] = 'block'
    }
    
    function controlOpen() {
        document['getElementById']('control')['style']['display'] = 'block';
        document['getElementById']('openControl')['style']['display'] = 'none'
    }
    
    window.onload = () => {
        document.getElementById('openControl').onclick = controlOpen;
        document.getElementById('hideControl').onclick = controlHide;
        document.getElementById('modeN').onclick = modeN;
        document.getElementById('modeP').onclick = modeP;
        document.getElementById('modeF').onclick = modeF;
        document.getElementById('stopP').onclick = stopP;
        document.getElementById('captchaLag').onclick = captchaLag;
        document.getElementById('chatGen').onclick = chatGen;
        document.getElementById('megasuperbebra').oninput = firstTime;
        document.getElementById('changeKey').onclick = changeKey;
    
        setTimeout(() => {
            document.getElementsByClassName('preloader')[0].style.display = 'none';
        }, 2000)
        setTimeout(() => {
            preloaderStatus = 0;
        }, 2000); modeN();
    }
})()