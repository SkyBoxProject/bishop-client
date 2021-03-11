import React, { Fragment, useEffect, useState } from 'react';
import { Layout } from '../../layout/Layout';
import { Button } from '../../components/Button';
import { createUseStyles } from 'react-jss';
import { config } from '../../config';
import { useAuth } from '../../providers/AuthProvider';
import { FaStream } from 'react-icons/fa';
import { LinearProgress } from '../../components/LinearProgress';

const useStyles = createUseStyles(theme => ({
   emptyCard: {
      color: '#cbd5e0',
      textAlign: 'center'
   },
}));

export function FeedList(props) {
   const auth = useAuth();
   const [feedList, setFeedList] = useState(null);
   const classes = useStyles();

   const getFeedList = async () => {
      const token = await auth.getToken();
      const response = await fetch(config.apiPath + 'feed', {
         method: 'GET',
         headers: { 'authorization': `bearer ${token}` }
      });
      if (!response.ok) return;

      const json = await response.json();
      const data = json.response;

      setFeedList(data);
   };

   useEffect(() => {
      getFeedList();
   }, []);

   return <Layout>
      <h2>Список фидов</h2>

      {feedList ? <Fragment>

         {!feedList.length ? <div className={classes.emptyCard}>
            <div>
               <FaStream style={{ fontSize: '5em' }} />
            </div>

            <div style={{ fontSize: '1.5em', color: 'grey' }}>Список фидов пуст</div>
            <Button color="green" style={{ margin: '20px auto' }}>Создать новый</Button>
         </div> : ''}

         {feedList.map(val => <div>
            <p>{val.id}</p>
            <p>{val.url}</p>
         </div>)}

      </Fragment> : <LinearProgress />}

   </Layout>
}
export default FeedList;