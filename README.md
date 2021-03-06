# 1. Классификация АС
- АС Вахтера принадлежит ко 2 группе.
- Вторая группа включает АС, в которых пользователи имеют одинаковые права доступа (полномочия) ко всей информации АС, обрабатываемой и (или) хранимой на носителях различного уровня конфиденциальности.
- Группа содержит два класса - 2Б и 2А.
- **Был выбран класс 2Б.**
# 2. Требования по защите информации от НСД для АС для класса 2Б
Обозначения:
  &quot; - &quot; - нет требований к данному классу;
  &quot; + &quot; - есть требования к данному классу.

| Подсистемы и требования | Классы |
| --- | --- |
| | 2Б |
| 1. Подсистема управления доступом |    |
| 1.1. Идентификация, проверка подлинности и контроль доступа субъектов: |    |
| в систему | + |
| к терминалам, ЭВМ, узлам сети ЭВМ, каналам связи, внешним устройствам ЭВМ | - |
| к программам | - |
| к томам, каталогам, файлам, записям, полям записей | - |
| 1.2. Управление потоками информации | - |
| 2. Подсистема регистрации и учета |    |
| 2.1. Регистрация и учет: |    |
| входа (выхода) субъектов доступа в (из) систему (узел сети) | + |
| выдачи печатных (графических) выходных документов | - |
| запуска (завершения) программ и процессов (заданий, задач) | - |
| доступа программ субъектов доступа к защищаемым файлам, включая их создание и удаление, передачу по линиям и каналам связи | - |
| доступа программ субъектов доступа к терминалам, ЭВМ, узлам сети ЭВМ, каналам связи, внешним устройствам ЭВМ, программам, томам, каталогам, файлам, записям, полям записей | - |
| изменения полномочий субъектов доступа | - |
| создаваемых защищаемых объектов доступа | - |
| 2.2. Учет носителей информации | + |
| 2.3. Очистка (обнуление, обезличивание) освобождаемых областей оперативной памяти ЭВМ и внешних накопителей | - |
| 2.4. Сигнализация попыток нарушения защиты | - |
| 3. Криптографическая подсистема |    | 
| 3.1. Шифрование конфиденциальной информации | - |
| 3.2. Шифрование информации, принадлежащей различным субъектам доступа (группам субъектов) на разных ключах | - |
| 3.3. Использование аттестованных (сертифицированных) криптографических средств | - |
| 4. Подсистема обеспечения целостности |    | 
| 4.1. Обеспечение целостности программных средств и обрабатываемой информации | + |
| 4.2. Физическая охрана средств вычислительной техники и носителей информации | + |
| 4.3. Наличие администратора (службы) защиты информации в АС | - |
| 4.4. Периодическое тестирование СЗИ НСД | + |
| 4.5. Наличие средств восстановления СЗИ НСД | + |
| 4.6. Использование сертифицированных средств защиты | - |

## 1.1 Идентификация, проверка подлинности и контроль доступа субъектов в систему
Контроль доступа осуществляется следующим образом:
Клиент отправляет запрос на api сервера:
```js
export const login =  (login, password) => {
    return async dispatch => {
    try {
        const response = await axios.post(`${API_URL}api/auth/login`, {
            login,
            password
        })
        //сохраняем пользователя в reducer
        dispatch(setUser(response.data.user))
        //сохраняем jwt токен на локальное хранилище устройства
        localStorage.setItem('token', response.data.token)
    } catch (e) {
        alert(e?.response?.data?.message)
    }
    }
}
```
Запрос выглядит следующим образом:
```json
{
  "first_name": "firstname",
  "last_name": "lastname",
  "login": "login",
  "password": "123das"
}
```
Сервер принимает запрос:
```js
router.post('/login',
async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty())
        {
            return res.status(400).json({message: "Uncorrect request", errors})
        }
        const {login, password} = req.body;
        // ищем пользователя с указанным в запросе логином
        const user = await mysqldb.findLogin(login)
        if(!user?.watchmanid)
        {
            return res.status(400).json({message: "user not found :( "})
        }
        /* сравниваем хеш-сумму пароля пользователя с указанным 
        логином, хранящуюся в БД и хеш-сумму пароля 
        отправленного в запросе пользователем */
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid)
        {
            return res.status(400).json({message: "invalid password"})
        }
        //Создаем jwt токен если пароль верный
        const token = jwt.sign({id: user.watchmanid}, config.get("secretKey"), {expiresIn: "1h"})
        //и отправляем его клиенту
        return res.json({
            token,
            user : {
                watchmanid: user.watchmanid,
                first_name: user.first_name,
                last_name: user.last_name
            }
        })
    } catch(e) 
    {
        console.log(e)
        res.send({message: 'Server error'})
    }
})
```
Авторизация: 
Клиент отправляет хранящийся на локальном устройстве jwt токен в запросе к api сервера.
```js
export const auth =  (login, password) => {
    return async dispatch => {
    try {
        const response = await axios.get(
            `${API_URL}api/auth/auth`, 
        {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        }
        )
        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token);
    } catch (e) {
        localStorage.removeItem('token');
    }
}
```
Сервер в каждой функции api будет работать с клиентом через auth middleware - это фильтр обработки HTTP запроса для проверки аутентификации пользователя, он реализован следующим образом:
```js
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS')
    {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        //получаем из запроса токен
        if (!token)
        {
            return res.status(401).json({message: "Auth error"})
        }
        //декодирум токен с помощью секретного ключа
        const decoded = jwt.verify(token, config.get('secretKey'))
        /* добавляем к запросу пользователя декодированный id текущего пользователя, который будет использоваться в функциях api, например, для записи в логи. */
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: "Auth error"})
    }
}
```
## 2.1. Регистрация и учет входа (выхода) субъектов доступа в (из) систему (узел сети)
Сервер при входе пользователя в систему добавляет в таблицу логов в базе данных запись о входе пользователя в систему.
```js
await mysqldb.appendLogs({
            subjtype: "Вахтёр", 
            subjid: user.watchmanid,
            act: "Вошел",
            objtype: "В систему",
            objid: 0
        })
```
```js
mysqldb.appendLogs = (log) =>
{
    return new Promise((resolve, reject) => {
        // формируем запрос к БД
        pool.query('INSERT logs(subjtype, subjid, act, objtype, objid, time) VALUES(?,?,?,?,?,?)', [
            log.subjtype,
            log.subjid,
            log.act,
            log.objtype,
            log.objid,
            // получаем текущую дату и время.
            new Date().toISOString().slice(0, 19).replace('T', ' ')
        ],(err, rows, fields) => {
            if (err) {
                return reject(err)
            }
            return resolve(rows);
        })
    })
}
```
## 4.1. Обеспечение целостности программных средств и обрабатываемой информации
Средства контроля целостности данных применяются для контроля информационных ресурсов, файлов, каталогов и папок, при котором обеспечивается их неизменность, защита от модификации и искажения, на протяжении всего жизненного цикла. Этот параметр является критическим аспектом проектирования, реализации и использования любой информационной системы, которая хранит, обрабатывает или извлекает данные. Главная цель обеспечения целостности данных заключается в том, чтобы информация изменялась только запланированным образом, а также сохранялась неизменной при следующем обращении, или, другими словами, была защищена от несанкционированных действий. Любые непреднамеренные изменения данных, возникающие в результате операций хранения, извлечения или обработки, включая воздействия вредоносных программ, неожиданный отказ оборудования или человеческий фактор — приводят к ошибкам целостности данных. В информационных системах целостность данных, которые не отправляются за пределы системы, обеспечивается за счет отказоустойчивости и возможности восстановления данных, например, из резервных копий. В случае отправки файлов во внешние информационные системы могут применяться криптографические методы защиты информации, такие как: 
### **Шифрование**.
Этот метод не может обеспечить полную защиту данных от модификации, из-за чего наравне с шифрованием применяют и другие методы обеспечения целостности данных. При передаче шифрованных данных может возникнуть ситуация, при которой могут быть удалены некоторые биты информации, изменен порядок их следования или злоумышленниками добавлены новые биты данных. Чтобы избежать этого, в криптографии применяется метод имитовставки, когда к шифрованным данным добавляется некоторое количество избыточной информации. Это позволяет снизить возможность расшифрования данных злоумышленниками. 
 ### **Хэширование**.
Данный метод подразумевается преобразование данных с применением хэш-функции или определенного алгоритма в строку определенной длины. Особенностью хэширования является изменение всей строки, в случае даже минимального изменения входных данных. 
### **Электронная подпись**. 
В общем смысле электронную подпись относят к реквизитам электронных документов, при этом она обеспечивает юридическую значимость документа и его целостность за счет применения криптографического преобразования. Чтобы подписать документ электронной подписью, необходимо использовать закрытый ключ, который хранится у владельца электронной подписи. При этом электронная подпись позволяет проверить данные на наличие возможных несанкционированных изменений, а также авторство документа и неотказуемость.  Обеспечение целостности данных также является одной из функций средств защиты информации от несанкционированного доступа. Эти средства защиты производят отслеживание неизменности данных в автоматическом режиме по заранее настроенному расписанию. При этом помимо неизменности самих файлов, средства защиты могут проверять неизменность прав доступа к объектам и их атрибутов. В случае выявления ошибок при прохождении процедуры контроля целостности, средства защиты от несанкционированного доступа могут сигнализировать об этом администраторам безопасности, запрещать доступ в систему, сохранять изменения в файлах или откатывать ресурсы до первоначального состояния. При этом средства защиты от несанкционированного доступа предоставляют следующие алгоритмы проверки целостности данных: электронно-цифровая подпись (проверяется встроенная цифровая подпись данных), CRC32 (или расчет контрольных сумм файлов), хэш, имитовставка, полное совпадение.
