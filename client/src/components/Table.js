import React, {useState, useEffect} from 'react';

import '../styles/style.css'
import Row from './Row'
import {getRecords} from "../http/records.API";

const Table = () => {
    // Значения формы
    const [search, setSearch] = useState('')
    const [condition, setCondition] = useState('')
    const [column, setColumn] = useState('')

    // Поле для сортировки
    const [sort, setSort] = useState('')
    
    // Записи из базы.
    // records - все записи
    // rows - ReactChild, после загрузки records получит записи
    const [records, setRecords] = useState([])
    const [rows, setRows] = useState(
        <p>Загрузка</p>
    )

    // Страница, максимальная страница и количество записей на странице
    const [page, setPages] = useState(1)
    const [maxpage, setMaxPage] = useState(1)
    const _RecordsOnPage = 1;


    useEffect( 
        () => {
            const EfAwait = async () => {
                // Получаем записи из базы с помощью get запроса
                let data = await getRecords(column, condition, search);
                // Записываем в records
                setRecords(data);
                let key;
                data = [];
                // Преобразовавыем records в массив data
                for (key in records){
                    data.push(records[key])
                }

                // Сортируем data в соответствии с sort
                switch (sort) {
                    case 'title':
                        data.sort(function(a, b) {
                            if (a.title > b.title) return 1
                            return -1 
                          });
                        break;

                    case 'quantity':
                        data.sort(function(a, b) {
                            return Number(a.quantity) - Number(b.quantity)
                        })
                        break;

                    case 'distance':
                        data.sort(function(a, b) {
                            return Number(a.distance) - Number(b.distance)
                        })
                        break;
                    default:
                        break;
                }

                // Вычисляем максимальное количество страниц
                setMaxPage(Math.ceil(data.length / _RecordsOnPage))
                // Обрезаем data в соответствии со страницей
                data = data.slice(_RecordsOnPage*(page-1), page*_RecordsOnPage);
                // Заносим React Child на основе даты в rows
                setRows( data.map((row) => <Row key={row.id}  row={row} />) )
            }
            EfAwait();
        }, [records, page, maxpage, column, condition, search, sort]
    );


    return (
        <div className="table-wrapper">
            <form className="form">
                <input
                    className="input-value"
                    name="search"
                    onChange={e => setSearch(e.target.value)}
                />

                <select
                    className="select-filter"
                    name="condition"
                    onChange={e => setCondition(e.target.value)}
                >
                    <option disabled>Фильтр</option>
                    <option value="more">Больше</option>
                    <option value="less">Меньше</option>
                    <option value="equal">Равно</option>
                    <option value="contained">Содержит</option>
                </select>

                <select
                    className="select-column"
                    name="column"
                    onChange={e => setColumn(e.target.value)}
                >
                    <option disabled>Колонка</option>
                    <option value="title">Название</option>
                    <option value="quantity">Количество</option>
                    <option value="distance">Расстояние</option>
                </select>
            </form>


            <div className="table">
                <div className="table-header">
                    <p 
                        className="header-title"
                        onClick={e => setSort('title')}
                    >Название</p>
                    <p className="header-quantity"
                        onClick={e => setSort('quantity')}
                    >Количество</p>
                    <p 
                        className="header-distance"
                        onClick={e => setSort('distance')}
                    >Расстояние</p>
                    <p 
                        className="header-dat"
                    >Дата</p>
                </div>

                <div className="rows">
                    { rows }
                </div>

            </div>

            <div className="pages-wrapper">
                    <span 
                        className="page-operation"
                        onClick={() => {
                            if (page > 1){
                                setPages(page-1)
                            }
                        }}
                    >-</span>
                    <span className="page">{page}</span>
                    <span
                        className="page-operation"
                        onClick={() => {
                            if (page < maxpage){
                                setPages(page+1)
                            }
                        }}
                    >+</span>
            </div>
        </div>
        );
    }

export default Table;