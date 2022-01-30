/* eslint no-unused-vars: 1 */

import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

import validateURL from '../helpers/validateURL';
import ErrorMessage from './ErrorMessage';

const ShortenUrlForm = () => {
    const [shortURL, changeShortURL] = useState('')
    const [validationError, toggleError] = useState('');
    // Removed onChange and used useRef instead to save the value to avoid the rerender on every change
    const inputEl = useRef('');

    const shortenTheURL =() => {
        const options = {
            long_url: inputEl.current.value,
        };
        axios.post("https://api-ssl.bitly.com/v4/shorten", options)
        .then(({ data }) => {
            changeShortURL(data.link)
        })
       .catch((error) => {
        if(error.response.status === 400){
            toggleError(error.response.data.description)
        }else{
            toast(error.response.data.description)
        }
        });
      }

    const onSubmit = (e) => {
            e.preventDefault();
            const isValid = validateURL(inputEl.current.value);
            if(isValid){
                if(validationError){
                    toggleError(false)
                }
                shortenTheURL();
            }else{
                toggleError('URL is not valid')
            }
        };

    useEffect(()=> {
        if(shortURL){
            navigator.clipboard.writeText(shortURL)
        }
    },[shortURL])

    return (
        <>
        <form onSubmit={onSubmit} className='form'>
            Url:
            <div>
            <label htmlFor="shorten">
                <input
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    ref={inputEl}
                    data-testid="shorten-input"
                />
            </label>
            <ErrorMessage validationError={validationError}/>
            </div>
            <button type="submit" data-testid="shorten-button">Shorten and copy URL</button>
        </form>
            {shortURL && !validationError &&
                <div data-testid="link-is-copied">{shortURL} - copied!</div>
            }
        </>
    );
};

export default ShortenUrlForm;
