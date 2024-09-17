

class SearchByNameService {

    async get<T>(name: string, getData: (name: string) => Promise<T[]>): Promise<T[]> {
        let items: T[] = [];
        if(name) items = await getData(name)    
        return items
    }

}

export const searchByNameService = new SearchByNameService()