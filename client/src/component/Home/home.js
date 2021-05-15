import React, { useState, useEffect } from 'react';

// Service
import SERVICEAPI from '../../service/fileAPI.js'

// Style
import './home.scss'

function Home(props) {
    const [systemData, getSystemData] = useState([]);
    const [searchInputField, setSearchText] = useState('');
    const [responseList, setResponseList] = useState([])
    useEffect(() => {
        SERVICEAPI.getSystemInfo().then((response) => {
            getSystemData(response.data)
        })
            .catch((error) => {
                console.log('Failed to fetch')
            })
    }, []);

    const setSearch = (text) => {
        let searchValue = `${'/' + text}`
        setSearchText(searchValue)
    }
    const searchDirectory = () => {
        SERVICEAPI.getDirInfo(searchInputField)
            .then((response) => {
                setResponseList(response.data)
            })
            .catch((error) => {
                alert('Error in search , you have entered a file or wrong path')
            })
    }
    const setInputText = (e) => {
        setSearchText(e.target.value)
    }
    const setSubDir = (subDir) => {
        let path = subDir.extension
        setSearchText(path)
    }
    return (
        <div className="home">
            <div className="home__inputField">
            <input placeholder="Search Here" value={searchInputField} type={'text'} onChange={(e) => setInputText(e)} />
            <button onClick={() => searchDirectory()}>Search</button>
            </div>
            <div className="home__initial">
                <ul>
                    {systemData.map((each, index) => {
                        return (
                            <li key={index} onClick={() => setSearch(each)}>{each}</li>
                        )
                    })}
                </ul>
            </div>

            

            <div className="home__responseList">
                {
                    responseList.map((each, index) => {
                        return (
                            <div className="home__responseListContainer" key={index} onClick={() => setSubDir(each)}>
                                <label>File Name : </label>
                                <h1>{each.name}</h1>
                                <div className="home__details">
                                <label>Extension : </label>
                                     <p>{each.extension}</p>
                                </div>
                                <div className="home__details">
                                <label>File Size : </label>
                                     <p>{each.fileSizeInBytes}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Home;