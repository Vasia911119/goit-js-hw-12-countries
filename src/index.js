import './sass/main.scss';
import { debounce } from 'lodash';
import { error, Stack } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import countriesList from './templates/countries-list.hbs';
import countryCard from './templates/country-card.hbs';
import fetchCountries from './js/fetchCountries';

const refs = {
    input: document.querySelector('#input'),
    output: document.querySelector('.country-box'),
};

refs.input.addEventListener('input', debounce(onInput, 500));

function onInput() {
    if (!refs.input.value) {
        return markupOutput(0);
    };
    fetchCountries(refs.input.value).then(data => {
    if (!data.length) {
        markupOutput(0);
        return errorMsg('There is no such country. Refine your request.');
        };
        if (data.length > 10) {
        markupOutput(0);
        errorMsg('Too many matches found. Please enter amore specific query!');
    } else if (data.length > 2 && data.length <= 10) {
        markupOutput(countriesList(data));
    } else {
        markupOutput(countryCard(data[0]));
        };
    return;
    });
};

function markupOutput(markup) {
    refs.output.innerHTML = '';
    if (markup) {
        refs.output.insertAdjacentHTML('afterbegin', markup);
        return;
    };
};

function errorMsg(message) {
    const myStack = new Stack({
        dir1: 'right',
        firstpos1: 25,
        spacing1: 36,
        push: 'right',
        modal: true,
        overlayClose: true,
        });
    return error({
        text: message,
        delay: 1500,
        closer: false,
        stack: myStack,
        title: 'WARNING!',
        icon: false,
        width: '300px',
        sticker: false,
        addClass: 'error-box',
    });
};