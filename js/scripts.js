
$( document ).ready(function() {

    AOS.init({
        duration: 1000,
    })

    $(".collapse-button").click(function () {
        $(this).toggleClass('show')
        $('.collapse-content').slideToggle()
    });

    if (screen.width > 990) {
        $('.lang-select').select2();
    } else {
        $('.lang-select-mobile').select2();
    }



    var result = [];

    $.get( "https://dex.binance.org/api/v1/mini/ticker/24hr?symbol=VTBC-C26M_BNB", function( outerData ) {
        $.get( "https://dex.binance.org/api/v1/mini/ticker/24hr", function( data ) {
            $.get( "https://dex.binance.org/api/v1/mini/tokens", function( innerData ) {
                $.get( "https://dex.binance.org/api/v1/ticker/24hr", function( innerInnerData ) {
                    // console.log(data)
                    // console.log(innerData)
                    // console.log(innerInnerData)
                    var bnbToUsd = parseFloat(innerInnerData.find(x => x.symbol == 'BNB_BUSD-BD1').lastPrice);
                    var btbcToBnb = parseFloat(data.find(x => x.symbol == 'VTBC-C26M_BNB').lastPrice);
                    for (let i = 0; i < data.length; i++) {
                        var token = innerData.find(x => data[i].baseAssetName == x.symbol)
                        var totalSupply = null;
                        if (token) {
                            totalSupply = token.total_supply;
                        }
                        result.push({
                            capitalization: parseFloat(totalSupply) * parseFloat(data[i].lastPrice),
                            symbol: data[i].symbol
                        });
                    }

                    result.sort((a, b) => (a.capitalization > b.capitalization) ? -1 : 1)
                    result = result.filter(x => x.capitalization > 0);
                    // console.log(result)
                    var rank = result.findIndex(x => x.symbol == 'VTBC-C26M_BNB') + 1;
                    $( "#global-rank" ).html( rank );

                    $( "#price" ).html( '$' + parseFloat(bnbToUsd * btbcToBnb).toFixed(3) );
                    $( "#volume" ).html( parseFloat(outerData[0].quoteVolume).toFixed(3) + ' ' + 'BNB' );
                    $( "#total-market-cap" ).html( '$' + parseFloat(bnbToUsd * btbcToBnb * 1000000).toFixed(0) );
                    $( "#vtbc-key" ).html(parseFloat( 26 / (bnbToUsd * btbcToBnb)).toFixed(2) + ' ' + 'VTBC');
                });
            });
        });
    });

    var dictionary = {
        EN: {
            menuItemOne: 'Products',
            menuItemTwo: 'Token',
            menuItemThree: 'Team',
            menuItemFour: 'About',
            menuItemFive: 'Contact us',
            tbccVPN: 'TBCC Wallet — blockchain wallet for everyone.',
            mainH2: 'Buy, store, send, exchange your cryptocurrency with an easy-to-use and convinient wallet.',
            mainCaptionOne: 'Are you in a search for the best cryptocurrency wallet?',
            mainPBlockOne: '6 reasons to choose TBCC Wallet',
            advItemOne: 'Track charts and prices within the wallet',
            advItemTwo: 'Buy crypto assets in several seconds',
            advItemThree: 'Your personal information is never collected',
            advItemFour: 'Keep your assets safe via TBCC VPN',
            advItemFive: 'Exchange your crypto without leaving the app',
            advItemSix: 'Own a possibility of voiting',
            mainCaptionTwo: 'Your wallet - your rules',
            rulesItemOne: 'Decentralized',
            rulesItemTwo: 'Convinient',
            rulesItemThree: 'Secure',
            rulesItemFour: 'Flexible',
            mainUlBlockLiOne: '• Simple and easy to use interface;',
            mainUlBlockLiTwo: '• More secure than centralized VPNs – be sure that all your data and transactions will be safe',
            mainUlBlockLiThree: '• TBCC VPN doesn’t collect logs',
            mainUlBlockLiFour: '• It has no single point of failure that is why it can’t be blocked;',
            mainUlBlockLiFive: '• TBCC VPN users can’t be identified by payments or traffic trace',
            mainUlBlockLiSix: '• Fast internet connection.',
            mainCaptionThree: 'Buy crypto assets with your credit card',
            mainPBlockTwo: 'Get as many cryptocurrency as you want in several seconds under the best rate',
            textButtonOne: 'Download now',
            textButtonTwo: 'Download now',
            textButtonThree: 'Try it now',
            textButtonFour: 'Try it now',
            mainCaptionFour: 'Decentralized trading',
            mainPBlockThree: 'The wallet works smoothly with the Binance DEX protocols, which allows you to make instant transactions on a decentralized exchange.',
            mainCaptionFive: 'Simple Exchange',
            mainPBlockFour: 'Exchange between any assets to diversify your portfolio Change your cryptocurrency at any time, in any place under the best rate.',
            mainCaptionSix: 'Safety and anonymity ',
            mainPBlock: '                        You are in control of all your digital assets. We will never get an access to your personal information or data.',
            mainH5One: 'Keep Your Data Private',
            mainH5Two: 'Private & Safe',
            mainH5Three: '24/7  Support',
            mainH5Four: 'Friendly interface',
            mainH5Five: 'One-click easy',
            mainPBlockFive: 'TBCC Wallet encrypts private keys and transaction data on your device and for your eyes only. Your data remains private - no account setup required. ',
            mainPBlockSix: 'Take your security to the next-level by using TBCC VPN. Even a supercomputer will not get your data. ',
            mainPBlockSeven: 'We won\'t leave you out on your own. TBCC Wallet provides an online 24/7 customer support to get your questions answered. ',
            mainPBlockEight: 'Interface of TBCC Wallet is absolutely easy-to use. Even if you have never worked with crypto assets before - you will not have problems with understanding of it with our app.',
            mainPBlockNine: 'Via TBCC Wallet you can manage your assets in several clicks. The app is absolutely convinient - you can do all necessary operation in one place. ',
            footerItemOne: 'Contact us',
            footerItemTwo: 'follow us',
            footerItemThree: 'Return Policy',
            footerItemFour: 'Terms of use',
            footerItemFive: 'Privacy Policy',
            footerItemSix: 'Complete description of services offered',
            tokenH1: 'What is VTBC?',
            tokenH2: ' VTBC token is the new digital asset that is released by TBCC VPN. It is fully decentralized and can be traded on Binance DEX with pair of BNB. VTBC is available on Binance Chain platform.',
            tokenCaptionOne: 'VTBC - new token on blockchain',
            tokenUlBlockOne: 'Afordable price',
            tokenUlBlockTwo: 'Fixed quantity with 1.000.000 token',
            tokenUlBlockThree: 'Works seamlessly with new BEP8 protocol',
            tokenUlBlockFour: 'Available for buying on Binance DEX or via TBCC Wallet',
            tokenCaptionTwo: 'Usage of VTBC',
            tokenPItemOne: 'Pay for your VPN keys to activate the TBCC VPN app',
            tokenPItemTwo: 'With VTBC token you can trade on Binance DEX',
            tokenPItemThree: 'AirDrop — share your VTBC token via AirDrop',
            tokenCaptionThree: 'VTBC Market perfomance',
            totalMarketCap: 'Total Market Cap',
            priceText: 'Price',
            volumeText: '24h Volume',
            globalRankText: 'Global Rank (protocol BEP8)',
            howH1: 'How to use TBCC VPN?',
            howH2: 'To start using TBCC VPN you need to do just 2 steps',
            howPBlockOne: 'To begin working with TBCC VPN you have to download the app (currently available for Android only)',
            howPBlockTwo: 'To activate VPN app you need to have VPN key.',
            howCaptionOne: 'How to get TBCC VPN key?',
            howPBlockThree: 'It’s quite simple. You have to download TBCC Wallet mobile app and buy a key with VTBC token.',
            howPBlockFour: 'VTBC tokens can be changed on Binance DEX in pair VTBC/BNB or in TBCC Wallet app on your mobile phone.',
            key: 'VPN key ',
            howPBlockFive: 'Note: you need to have Binance Coin (BNB) on your balance. One key is available for one year.',
            aboutH1: 'About TBCC VPN',
            aboutH2: 'TBCC VPN is one of the services that is provided to users by TBCC Labs. The mission of TBCC VPN is to provide safe and fast internet connection without any logs, spy or selling data. We want to help our users to forget about cyber borders, without compromising the safety of data. Our priority is to make all your transactions fast and secure.',
            globalServers: 'Global servers',
            aboutPBlockOne: 'We don’t use servers as ordinary VPN services do. TBCC VPN is totally decentralized. You can be in any place in the world and use our VPN, your location doesn\'t matter.',
            aboutCaptionOne: 'Unlike other VPN, TBCC VPN has such distinctive features as:',
            aboutUlBlockOne: 'IP Blacklisting',
            aboutUlBlockTwo: ' QoS Guarantees',
            aboutUlBlockThree: 'No Logging – you have no need to provide your ID to the service;',
            aboutUlBlockFour: 'Internal VPN stock',
            aboutUlBlockFive: 'Variable encryption',
            keyBenefits: 'Key benefits',
            aboutCaptionTwo: 'Why TBCC VPN is better?',
            aboutPBlockTwo: 'TBCC VPN is much safer than other VPNs because it implements original cryptography, unlike other VPNs. The connection of the Internet will be extremely fast – you have no need to worry that you won’t succeed to do an immediate purchase on Binance DEX. Also, TBCC VPN has and easy-to-use interface. We provide you with totally anonymous app, that will never provide information upon your transactions and data.',
            aboutH3One: 'Shielded and widened internet surfing',
            aboutH3Two: 'Totally anonymous',
            aboutH3Three: 'Decentralized',
            aboutPBlockThree: 'With TBCC VPN, you are fully protected from tracking and monitoring. You can work in the Internet, watch videos, use any app.',
            aboutPBlockFour: 'TBCC VPN protects you from the undesired attention from spy websites and annoying advertisers. No problems with visiting websites – your real IP will never be flagged on the Internet.',
            aboutPBlockFive: 'TBCC VPN is based on the decentralized Cellframe blockchain platform. Decentralization allows you to be independent of servers location and your connection is as fast as possible!'
        },
        RU: {
            menuItemOne: 'Продукты',
            menuItemTwo: 'Токен',
            menuItemThree: 'Команда',
            menuItemFour: 'О сервисе',
            menuItemFive: 'Контакты',
            tbccVPN: 'TBCC Wallet - блокчейн кошелек для каждого',
            mainH2: 'Покупайте, храните, отправляйте, обменивайте свою криптовалюту с помощью простого в использовании и удобного кошелька.',
            mainCaptionOne: 'Вы ищете лучший кошелек для криптовалюты?',
            mainPBlockOne: '6 причин для выбора TBCC Wallet',
            advItemOne: 'Следите за графиками и ценами в приложении мобильного кошелька',
            advItemTwo: 'Ваша личная информация никогда не будет собираться и записываться',
            advItemThree: 'Обменивайте свою криптовалюту, не выходя из приложения',
            advItemFour: 'Покупайте криптоактивы за несколько секунд',
            advItemFive: 'Защитите свои активы с помощью TBCC VPN',
            advItemSix: 'Возможность голосования',
            mainCaptionTwo: 'Ваш кошелек - Ваши правила',
            rulesItemOne: 'Децентрализованный',
            rulesItemTwo: 'Удобный',
            rulesItemThree: 'Безопасный',
            rulesItemFour: 'Свободный',
            mainCaptionThree: 'Больше никаких границ',
            mainPBlockTwo: 'Получите неограниченный доступ к музыке, социальным медиа, видео, приложениям и другим интернет ресурсам из любой точки планеты. Забудьте о гео-блоках и наслаждайтесь интернетом без кибер границ',
            textButtonOne: 'Загрузить сейчас',
            textButtonTwo: 'Загрузить сейчас',
            textButtonThree: 'Начать работу',
            textButtonFour: 'Начать работу',
            mainCaptionFour: 'Децентрализованная торговля',
            mainPBlockThree: 'Кошелек бесперебойно работает с протоколами Binance DEX, что позволяет совершать мгновенные транзакции или делать оперативные торги на децентрализованной бирже.',
            mainCaptionFive: 'Простой обмен',
            mainPBlockFour: 'Совершайте процесс обмена между любыми активами для диверсификации вашего портфеля. Меняйте свою криптовалюту в любое время и в любом месте по лучшему курсу.',
            mainCaptionSix: 'Безопасность и анонимность',
            mainPBlock: 'Вы контролируете все свои цифровые активы. Мы никогда не получим доступ к Вашей личной информации или данным.',
            mainH5One: 'Храните Ваши данные в тайне',
            mainH5Two: 'Частный и безопасный',
            mainH5Three: 'Поддержка пользователей 24/7 ',
            mainH5Four: 'Понятный интерфейс',
            mainH5Five: 'Легкость в один клик',
            mainPBlockFive: 'TBCC Wallet позволяет шифровать личные ключи и данные транзакций на Вашем устройстве и только для Ваших глаз. Ваши данные остаются конфиденциальными - настройка учетной записи не требуется.',
            mainPBlockSix: 'Поднимите свою безопасность на новый уровень с помощью приложения TBCC VPN. Даже суперкомпьютер не получит доступа к Вашим данным',
            mainPBlockSeven: 'Мы не оставим Вас в одиночку. TBCC Wallet предоставляет онлайн-службу круглосуточной поддержки клиентов, чтобы Вы могли получить ответы на Ваши вопросы ',
            mainPBlockEight: 'Интерфейс кошелька TBCC очень прост в использовании. Даже если Вы никогда раньше не работали с криптоактивами - у Вас не возникнет проблем с пониманием этого во время использования нашего приложения',
            mainPBlockNine: 'При помощи TBCC Wallet Вы можете управлять своими активами в несколько кликов. Приложение абсолютно удобное - все необходимые операции можно выполнять в одном месте.',
            footerItemOne: 'свяжитесь с нами',
            footerItemTwo: 'Следите и подписывайтесь на наши социальные сети',
            footerItemThree: 'Политика возврата',
            footerItemFour: 'Правила использования',
            footerItemFive: 'Политика конфиденциальности',
            footerItemSix: 'Полное описание предлагаемых сервисов',
            tokenH1: 'Что такое VTBC?',
            tokenH2: 'VTBC токен это новый вид цифровых активов, выпущенный сервисом TBCC VPN. Он полностью децентрализован и может торговаться на Binance DEX в паре с BNB. VTBC доступен на платформе Binance Chain.',
            tokenCaptionOne: 'VTBC - новый токен в блокчейн',
            tokenUlBlockOne: 'Доступная цена',
            tokenUlBlockTwo: 'Фиксированное количество в 1.000.000 токенов',
            tokenUlBlockThree: 'Работает бесперебойно с новым BEP8 протоколом',
            tokenUlBlockFour: 'Доступен для покупки на бирже Binance DEX или через TBCC Wallet',
            tokenCaptionTwo: 'Использование VTBC',
            tokenPItemOne: 'Оплачивайте VPN ключи для активации приложения TBCC VPN ',
            tokenPItemTwo: 'С VTBC token вы можете торговать на бирже Binance DEX',
            tokenPItemThree: 'Получайте VTBC token через AirDrop',
            tokenCaptionThree: 'Рыночные данные о VTBC',
            totalMarketCap: 'Общая рыночная капитализация',
            priceText: 'Цена',
            volumeText: '24 часовой объем',
            globalRankText: 'Мировой рейтинг (среди протокола BEP8)',
            howH1: 'Как использовать TBCC VPN?',
            howH2: 'Для того, чтобы начать использование TBCC VPN вам необходимо сделать всего 2 шага',
            howPBlockOne: 'Для начала работы с приложением TBCC VPN вам нужно установить мобильное приложение (временно доступно только приложение для Android)',
            howPBlockTwo: 'Для того, чтобы активировать VPN приложение вам необходимо иметь VPN ключ',
            howCaptionOne: 'Как получить ключ для TBCC VPN?',
            howPBlockThree: 'Это достаточно просто. Вам необходимо установить мобильное приложение TBCC Wallet и купить ключ при помощи VTBC токенов. Войти в кошелек',
            howPBlockFour: 'Токены VTBC можно получить на бирже Binance DEX в паре VTBC/BNB или в приложении TBCC Wallet на вашем мобильном телефоне',
            key: 'VPN ключ ',
            howPBlockFive: 'Внимание: вам необходимо иметь Binance Coin (BNB) на вашем балансе',
            aboutH1: 'О TBCC VPN',
            aboutH2: 'TBCC VPN является одним из сервисов, предоставляемых пользователям компанией TBCC Labs. Миссия TBCC VPN - обеспечить безопасное и быстрое подключение к Интернету без каких-либо лагов, шпионажа или продажи данных. Мы хотим помочь нашим пользователям забыть о кибер-границах, не ставя при этом под угрозу безопасность данных. Наш приоритет - сделать все ваши транзакции быстрыми и безопасными.',
            globalServers: 'Международные серверы',
            aboutPBlockOne: 'Мы не используем серверы, как обычные VPN-сервисы. TBCC VPN полностью децентрализован. Вы можете быть в любой точке мира и использовать наш VPN, ваше местоположение не имеет значения.',
            aboutCaptionOne: 'В отличии от других VPN сервисов TBCC VPN имеет следующие отличительные характеристики:',
            aboutUlBlockOne: 'IP Blacklisting (черный список IP);',
            aboutUlBlockTwo: 'QoS гарантии;',
            aboutUlBlockThree: 'Никаких логинов– вам не нужно предоставлять ваши персональные данные для пользования сервисом',
            aboutUlBlockFour: 'Внутренний VPN сток',
            aboutUlBlockFive: 'Переменное шифрование.',
            keyBenefits: 'Основные преимущества',
            aboutCaptionTwo: 'Почему TBCC VPN лучше других?',
            aboutPBlockTwo: 'TBCC VPN намного безопаснее, чем другие VPN, потому что мы используем оригинальную криптографию, в отличие от других VPN. Подключение к Интернету будет очень быстрым - вам не нужно беспокоиться о том, что вам не удастся совершить мгновенную покупку на Binance DEX. Кроме того, TBCC VPN имеет простой и легкий в использовании интерфейс. Мы предоставляем вам абсолютно анонимное приложение, которое никогда не предоставит информацию о ваших транзакциях и данных.',
            aboutH3One: 'Расширенный интернет-серфинг',
            aboutH3Two: 'Полностью анонимный',
            aboutH3Three: 'Децентрализованный',
            aboutPBlockThree: 'С TBCC VPN вы полностью защищены от отслеживания и мониторинга. Вы можете работать в Интернете, смотреть видео, использовать любые приложения.',
            aboutPBlockFour: 'TBCC VPN защищает вас от нежелательного внимания со стороны шпионских сайтов и раздражающих рекламодателей. Никаких проблем с посещением веб-сайтов - ваш реальный IP никогда не будет заметен в Интернете.',
            aboutPBlockFive: 'TBCC VPN основан на децентрализованной платформе блокчейна Cellframe. Децентрализация позволяет вам быть независимым от расположения серверов, и ваше соединение будет максимально быстрым!'
        }
    }

    var language = 'EN';

    if(localStorage.getItem('todoLang')){
        $('.lang').val(localStorage.getItem('todoLang'));
        console.log('kdjdj')
        setLanguage(dictionary, localStorage.getItem('todoLang'));
        language = localStorage.getItem('todoLang');
    } else {
        setLanguage(dictionary, language);
    }

    $('.lang').change(function () {
        language = $(this).val();
        setLanguage(dictionary, language);
        localStorage.setItem('todoLang', language);
    });



});

function compare( a, b ) {
    if ( a.capitalization < b.capitalization ){
        return -1;
    }
    if ( a.capitalization > b.capitalization ){
        return 1;
    }
    return 0;
}

function setLanguage(dictionary, language)
{
    $('#menuItemOne').text(dictionary[language].menuItemOne);
    $('#menuItemTwo').text(dictionary[language].menuItemTwo);
    $('#menuItemThree').text(dictionary[language].menuItemThree);
    $('#menuItemFour').text(dictionary[language].menuItemFour);
    $('#menuItemFive').text(dictionary[language].menuItemFive);
    $('#tbccVPN').text(dictionary[language].tbccVPN);
    $('#mainH2').text(dictionary[language].mainH2);
    $('#mainCaptionOne').text(dictionary[language].mainCaptionOne);
    $('#mainPBlockOne').text(dictionary[language].mainPBlockOne);
    $('#advItemOne').text(dictionary[language].advItemOne);
    $('#advItemTwo').text(dictionary[language].advItemTwo);
    $('#advItemThree').text(dictionary[language].advItemThree);
    $('#advItemFour').text(dictionary[language].advItemFour);
    $('#advItemFive').text(dictionary[language].advItemFive);
    $('#advItemSix').text(dictionary[language].advItemSix);
    $('#mainCaptionTwo').text(dictionary[language].mainCaptionTwo);
    $('#rulesItemOne').text(dictionary[language].rulesItemOne);
    $('#rulesItemTwo').text(dictionary[language].rulesItemTwo);
    $('#rulesItemThree').text(dictionary[language].rulesItemThree);
    $('#rulesItemFour').text(dictionary[language].rulesItemFour);
    $('#mainCaptionThree').text(dictionary[language].mainCaptionThree);
    $('#mainCaptionFour').text(dictionary[language].mainCaptionFour);
    $('#mainCaptionFive').text(dictionary[language].mainCaptionFive);
    $('#mainCaptionSix').text(dictionary[language].mainCaptionSix);
    $('#mainPBlockTwo').text(dictionary[language].mainPBlockTwo);
    $('#mainPBlock').text(dictionary[language].mainPBlock);
    $('#textButtonOne').text(dictionary[language].textButtonOne);
    $('#textButtonTwo').text(dictionary[language].textButtonTwo);
    $('#textButtonThree').text(dictionary[language].textButtonTwo);
    $('#textButtonFour').text(dictionary[language].textButtonFour);
    $('#mainPBlockThree').text(dictionary[language].mainPBlockThree);
    $('#mainPBlockFour').text(dictionary[language].mainPBlockFour);
    $('#mainH5One').text(dictionary[language].mainH5One);
    $('#mainH5Two').text(dictionary[language].mainH5Two);
    $('#mainH5Three').text(dictionary[language].mainH5Three);
    $('#mainH5Four').text(dictionary[language].mainH5Four);
    $('#mainH5Five').text(dictionary[language].mainH5Five);
    $('#mainPBlockFive').text(dictionary[language].mainPBlockFive);
    $('#mainPBlockSix').text(dictionary[language].mainPBlockSix);
    $('#mainPBlockSeven').text(dictionary[language].mainPBlockSeven);
    $('#mainPBlockEight').text(dictionary[language].mainPBlockEight);
    $('#mainPBlockNine').text(dictionary[language].mainPBlockNine);
    $('#footerItemOne').text(dictionary[language].footerItemOne);
    $('#footerItemFour').text(dictionary[language].footerItemFour);
    $('#footerItemFive').text(dictionary[language].footerItemFive);
    $('#tokenH1').text(dictionary[language].tokenH1);
    $('#tokenH2').text(dictionary[language].tokenH2);
    $('#tokenCaptionOne').text(dictionary[language].tokenCaptionOne);
    $('#tokenUlBlockOne').text(dictionary[language].tokenUlBlockOne);
    $('#tokenUlBlockTwo').text(dictionary[language].tokenUlBlockTwo);
    $('#tokenUlBlockThree').text(dictionary[language].tokenUlBlockThree);
    $('#tokenUlBlockFour').text(dictionary[language].tokenUlBlockFour);
    $('#tokenCaptionTwo').text(dictionary[language].tokenCaptionTwo);
    $('#tokenPItemOne').text(dictionary[language].tokenPItemOne);
    $('#tokenPItemTwo').text(dictionary[language].tokenPItemTwo);
    $('#tokenPItemThree').text(dictionary[language].tokenPItemThree);
    $('#tokenCaptionThree').text(dictionary[language].tokenCaptionThree);
    $('#totalMarketCap').text(dictionary[language].totalMarketCap);
    $('#priceText').text(dictionary[language].priceText);
    $('#volumeText').text(dictionary[language].volumeText);
    $('#globalRankText').text(dictionary[language].globalRankText);
    $('#howH1').text(dictionary[language].howH1);
    $('#howH2').text(dictionary[language].howH2);
    $('#howPBlockOne').text(dictionary[language].howPBlockOne);
    $('#howPBlockTwo').text(dictionary[language].howPBlockTwo);
    $('#howCaptionOne').text(dictionary[language].howCaptionOne);
    $('#howPBlockThree').text(dictionary[language].howPBlockThree);
    $('#howPBlockFour').text(dictionary[language].howPBlockFour);
    $('#key').text(dictionary[language].key);
    $('#howPBlockFive').text(dictionary[language].howPBlockFive);
    $('#aboutH1').text(dictionary[language].aboutH1);
    $('#aboutH2').text(dictionary[language].aboutH2);
    $('#globalServers').text(dictionary[language].globalServers);
    $('#aboutPBlockOne').text(dictionary[language].aboutPBlockOne);
    $('#aboutCaptionOne').text(dictionary[language].aboutCaptionOne);
    $('#aboutUlBlockOne').text(dictionary[language].aboutUlBlockOne);
    $('#aboutUlBlockTwo').text(dictionary[language].aboutUlBlockTwo);
    $('#aboutUlBlockThree').text(dictionary[language].aboutUlBlockThree);
    $('#aboutUlBlockFour').text(dictionary[language].aboutUlBlockFour);
    $('#aboutUlBlockFive').text(dictionary[language].aboutUlBlockFive);
    $('#keyBenefits').text(dictionary[language].keyBenefits);
    $('#aboutCaptionTwo').text(dictionary[language].aboutCaptionTwo);
    $('#aboutPBlockTwo').text(dictionary[language].aboutPBlockTwo);
    $('#aboutH3One').text(dictionary[language].aboutH3One);
    $('#aboutH3Two').text(dictionary[language].aboutH3Two);
    $('#aboutH3Three').text(dictionary[language].aboutH3Three);
    $('#aboutPBlockThree').text(dictionary[language].aboutPBlockThree);
    $('#aboutPBlockFour').text(dictionary[language].aboutPBlockFour);
    $('#aboutPBlockFive').text(dictionary[language].aboutPBlockFive);
}
