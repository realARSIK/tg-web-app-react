import React, { useCallback, useEffect, useState } from "react"
import './Form.css'
import { useTelegram } from "../../hooks/useTelegram"

const Form = () => {
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [os, setOs] = useState('windows')
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            os
        }

        tg.sendData(JSON.stringify(data))
    }, [country, city, os, tg])

    useEffect(() => {
        tg.WebApp.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.WebApp.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData, tg])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [tg])

    useEffect(() => {
        if(!country || !city) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, city, tg])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }

    const onChangeCity = (e) => {
        setCity(e.target.value)
    }

    const onChangeOs = (e) => {
        setOs(e.target.value)
    }

    return (
        <>
            <div className="form">
                <h3>Введите свои данные</h3>
                <input type="text" className="input" placeholder="Страна" value={country} onChange={onChangeCountry}/>
                <input type="text" className="input" placeholder="Город" value={city} onChange={onChangeCity}/>
                
                <label className="label" htmlFor="os">Какая у вас операционная сеть?</label>
                <select value={os} onChange={onChangeOs} id="os" className="select">
                    <option value={"windows"}>Windows</option>
                    <option value={"macoc"}>MacOC</option>
                    <option value={"linux"}>Linux</option>
                </select>
            </div>
        </>
    )
}

export default Form