import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import styles from "./App.module.css";
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { getOpenModal } from '../../services/store';
import { CLOSE_MODAL, NO_GROUP, OPEN_MODAL, selectGroup } from '../../services/actions';
import Modal from '../modal/Modal';
import GroupDetails from '../details/GroupDetails';

interface Group {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
}

interface User {
  first_name: string;
  last_name: string;
}

interface Filter {
  privacy: 'all' | 'closed' | 'open';
  avatarColor: 'all' | 'red' | 'green' | 'yellow' | 'blue' | 'purple' | 'white' | 'orange';
  hasFriends: boolean;
}

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showFriendsMap, setShowFriendsMap] = useState<{ [groupId: number]: boolean }>({});
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [filter, setFilter] = useState<Filter>({
    privacy: 'all',
    avatarColor: 'all',
    hasFriends: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const friendsModal = useAppSelector(getOpenModal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<Group[]> = await axios.get<Group[]>('/groups.json');
        const data = response.data || [];
        setGroups(data);
        setFilteredGroups(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error('Error fetching groups:', error);
        setGroups([]);
        setFilteredGroups([]);
        setLoading(false);
        setError('An error occurred while fetching groups.');
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'hasFriends') {
      const checked = (event.target as HTMLInputElement).checked;
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: checked,
      }));
    } else {
      setFilter((prevFilter) => ({
        ...prevFilter,
        [name]: value as Filter['avatarColor'],
      }));
    }
  };

  useEffect(() => {
    let filtered = groups;

    if (filter.privacy !== 'all') {
      filtered = filtered.filter((group) => {
        return filter.privacy === 'closed' ? group.closed : !group.closed;
      });
    }

    if (filter.avatarColor !== 'all') {
      filtered = filtered.filter((group) => {
        return group.avatar_color === filter.avatarColor;
      });
    }

    if (filter.hasFriends) {
      filtered = filtered.filter((group) => {
        return group.friends && group.friends.length > 0;
      });
    }

    setFilteredGroups(filtered);
  }, [groups, filter]);

  // const showFriends = (groupId: number) => {
  //   setShowFriendsMap((prevMap) => ({
  //     ...prevMap,
  //     [groupId]: !prevMap[groupId],
  //   }));
  // };

  const openGroupModal = (group: any) => {
    dispatch(selectGroup(group));
    dispatch({
        type: OPEN_MODAL,
    });
  };

  function closeModal() {
    dispatch({ type: CLOSE_MODAL });
    dispatch({type: NO_GROUP})
  }

  return (
    <div className={styles.App}>
      <header className={styles.head}>
        <h1 className={styles.title}>Groups</h1>
        <div className={styles.filter}>
          <label className={styles.option}>
            Privacy:
            <select className={styles.selector} name="privacy" value={filter.privacy} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="closed">Closed</option>
              <option value="open">Open</option>
            </select>
          </label>
          <label className={styles.option}>
            Color:
            <select className={styles.selector} name="avatarColor" value={filter.avatarColor} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="blue">Blue</option>
              <option value="purple">Purple</option>
              <option value="white">White</option>
              <option value="orange">Orange</option>
            </select>
          </label>
          <label className={styles.option}>
            Has Friends:
            <input
            className={styles.custom}
              type="checkbox"
              name="hasFriends"
              checked={filter.hasFriends}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </header>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className={styles.list}>
          {filteredGroups.length === 0 ? (
            <span className={styles.no_result}>No results found</span>
          ) : (
            filteredGroups.map((group) => (
              <div 
              key={group.id} className={styles.group}>
                <div className={styles.info}>
                  {group.avatar_color && (
                    <div
                      className={styles.avatar}
                      style={{ backgroundColor: group.avatar_color }}
                    />
                  )}
                  <h3 className={styles.name}>{group.name}</h3>
                </div>
                <div className={styles.container}>
                  <span className={styles.item}>Privacy: {group.closed ? 'Closed' : 'Open'}</span>
                  <span className={styles.item}>Members: {group.members_count}</span>
                </div>
                {group.friends && group.friends.length > 0 && (
                    <button className={styles.butt} onClick = {() => openGroupModal(group)}>
                      Friends ({group.friends.length})
                    </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
      {friendsModal && <Modal onClose={closeModal}>
        <GroupDetails />
      </Modal>}
    </div>
  );
}

export default App;
