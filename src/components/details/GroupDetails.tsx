import { useAppSelector } from "../../services/hooks";
import { getFriends } from "../../services/store";
import styles from './GroupDetails.module.css';

const GroupDetails = () => {

    const {group} = useAppSelector(getFriends);
    group && console.log(group.name);

    return(
        <div className={styles.friends}>
            {group && ( 
                <>
                    <h4 className={styles.item}>{group.name}</h4>
                    {group.friends.map((friend: any, index: number) => (
                        <li className={styles.value} key={index}>{`${friend.first_name} ${friend.last_name}`}</li>
                    ))}
                </>
            )}
        </div>
    )
}

export default GroupDetails;