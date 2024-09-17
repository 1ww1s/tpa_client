import { GetDataByName } from "@/src/features/getDataByName";
import { SelectFromList } from "@/src/features/selectFromList";
import { FC, useEffect, useMemo, useState } from "react";
import classes from './searchAndSelection.module.scss'
import { certificateService, ICertificate } from "@/src/entities/certificate";
import { SearchByName } from "@/src/features/searchByName";
import { SortByField } from "@/src/features/sortByField";
import { IUser, userService } from "@/src/entities/user";

interface SearchProps {
    setUser: (user: IUser) => void;
    setSelectedWidget: (selectedWidget: number) => void;
    selectedWidget: number;
}


export const SearchAndSelection: FC<SearchProps> = ({setUser, selectedWidget, setSelectedWidget}) => {
   
    const [users, setUsers] = useState<IUser[]>([])
    const [usersSearch, setUsersSearch] = useState<IUser[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const onSelected = async (selected: IUser) => {
        setUser(selected)
        setSelectedWidget(selectedWidget + 1)
    }

    const getUsers = async () => {
        try{    
            setIsLoading(true)
            const users = await userService.getAll()
            setUsers(users)
            setUsersSearch(users)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div className={classes.search}>
            <h3>Найти пользователя</h3>
            <div className={classes.action}>
                <div className={classes.search}>
                    <SearchByName 
                        items={users}
                        setItems={setUsersSearch}
                        field='email'
                    />
                </div>
            </div>
            <hr />
            <div className={classes.list}>
                <SelectFromList 
                    items={usersSearch}
                    field={'email'}
                    onSelected={onSelected}
                    isLoading={isLoading}
                />
                <ul className={classes.roles}>
                    {usersSearch.map(user => 
                        <li key={user.email}>{user.roles.map(role => <span key={role}>{role}</span>)}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}