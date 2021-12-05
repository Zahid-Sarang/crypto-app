import React,{useState, useEffect} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Row,Card,Col,Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 :100;
    const {data:cryptosList,isfetching} = useGetCryptosQuery(count);
    const [cryptos, setcryptos] = useState([]);
    const [seacrhTerm, setSeacrhTerm] = useState('');

    useEffect(() => {
       const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(seacrhTerm.toLowerCase()));
       setcryptos(filteredData);
    }, [cryptosList,seacrhTerm])

    console.log(cryptos);

    if(isfetching) return 'Loding.....';

    return (
        <>
        {!simplified &&(
            <div className="search-crypto">
            <input placeholder="Search Cryptocurrency" onChange={(e) => setSeacrhTerm(e.target.value)} />
        </div>
        )}
      
           <Row gutter={[32,32]} className="crypto-card-container">
               {
                   cryptos?.map((currency) =>(
                       <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                           <Link to={`/crypto./${currency.id}`}>
                               <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl }/>} hoverable>
                                   <p>Price: {millify(currency.price)}</p>
                                   <p>Market Cap: {millify(currency.marketCap)}</p>
                                   <p>Daily Change: {millify(currency.change)}%</p>
                               </Card>
                           </Link>
                       </Col>
                   ))
               }
           </Row>
        </>
    )
}

export default Cryptocurrencies
