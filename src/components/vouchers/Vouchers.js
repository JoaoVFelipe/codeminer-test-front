import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Vouchers.css'
import { VoucherService } from '../../services/VoucherService';


const Vouchers = () => {
    const listAppliedVouchers = useSelector(state => state.listAppliedVouchers);
    const [listVouchers, setListVouchers] = useState([]);
    const [voucher, setVoucher] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await VoucherService.getVouchers().then(data => {
                if(data){
                    setListVouchers(data.vouchers);
                }
                else{
                    console.log("An error ocurred. We aren't able to get the vouchers list.");
                    setListVouchers([]);
                }
                
            });
        }
        fetchData();
    }, []);

    function applyVoucher(){
       let validVoucher = VoucherService.validVoucher(voucher, listVouchers, listAppliedVouchers);
       console.log(validVoucher)
       if(validVoucher.valid === true){
            dispatch({type: 'APPLY_VOUCHER', voucher: validVoucher.voucher});
       }
    }

  return(  
    <div className="Vouchers">
        <input class="voucher-input" type="text" placeholder="Have an discount code?" onChange={e => setVoucher(e.target.value)} />
        <button onClick={applyVoucher}> Apply </button>
    </div>
  );
};

export default Vouchers;