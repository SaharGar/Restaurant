import React, {useState} from "react";
import {useQuery} from 'react-query'
import {PersonCard} from "./PersonCard";
import {fetchPeople} from "../../api.service";
import {useDispatch} from "react-redux";
import {landingPageActions} from "../../store/landing-page.slice";
import {ERROR, LOADING, RE_CHOOSE_NAME, NEXT_PAGE, PREVIOUS_PAGE} from "../../consts";
import {TextInput} from "../input/TextInput";
import {useDebounce} from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";


export const People: React.FC = () => {

    const [page, setPage] = useState<number>(1);
    const [searchValue, setSearchValue] = useState<string>('')
    const debouncedValue = useDebounce(searchValue, 500)
    const {data, isLoading, isFetched, isError} = useQuery(['people', page, debouncedValue], () => fetchPeople(page, debouncedValue));
    const dispatch = useDispatch();

    const onReChooseRestaurantName = () => {
        dispatch(landingPageActions.setRestaurantName(''));
    }

    const onSetPage = (diff: number) => {
        setPage(prevPage => prevPage + diff);
    }

    const onSetSearchValue = (name: string) => {
        setSearchValue(name)
    }

    return (
        <div className='people flex column'>
            {isLoading && <h1>{LOADING}</h1>}
            {isError && <h1>{ERROR}</h1>}
            {isFetched &&
                <>
                    <div className='buttons flex column align-center'>
                        <button className='landing-page-btn' onClick={onReChooseRestaurantName}>{RE_CHOOSE_NAME}</button>
                        <h3>Who is the Owner of the Restaurant?</h3>
                        <TextInput placeholder={'Search By Name'} value={searchValue} onChangeFunc={onSetSearchValue}/>
                        <div className='page-buttons flex'>
                            <button className='landing-page-btn' disabled={page === 1}
                                    onClick={() => onSetPage(-1)}>{PREVIOUS_PAGE}
                            </button>
                            <button className='landing-page-btn' disabled={page === data?.info.pages}
                                    onClick={() => onSetPage(1)}>{NEXT_PAGE}
                            </button>
                        </div>
                    </div>
                    <div className='people-list'>
                        {data?.results.map((result, idx) => <PersonCard key={idx} name={result.name}
                                                                        imageUrl={result.image}/>)}
                    </div>
                </>}
        </div>)
}
