import { University } from '@customTypes/index';

export const getUniversity = async (value: string): Promise<University[]> => {
    //Could return a lot of results use virtualization or other optimization techniques for the relative list component
    const response = await fetch(
        `http://universities.hipolabs.com/search?name=${value}`,
    );
    const data = (await response.json()) as University[];
    return data;
};
