import React from 'react'


// import components
import PeopleList from '@/components/people/PeopleList';


const People = async () => {
    return (
        <section className='max-h-[100vh] w-full p-[1rem] flex flex-col overflow-hidden'>
            <div className='flex items-center text-[2rem]'>People</div>

            <hr className='my-[1rem]' />

            <PeopleList />
        </section>
    )
}

export default People;