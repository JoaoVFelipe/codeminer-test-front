import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Vouchers.css";
import { VoucherService } from "../../services/VoucherService";

const Vouchers = () => {
  const listAppliedVouchers = useSelector((state) => state.listAppliedVouchers);
  const [listVouchers, setListVouchers] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [loadedWithoutErrors, setLoadedWithoutErrors] = useState(true);
  const [applied, setApplied] = useState(false);
  const [notApplied, setNotApplied] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  //Gets voucher data from API
  async function fetchData() {
    setLoadedWithoutErrors(true);
    await VoucherService.getVouchers().then((data) => {
      if (data) {
        setListVouchers(data.vouchers);
      } else {
        setLoadedWithoutErrors(false);
        setListVouchers([]);
      }
    });
  }

  //Checks if a voucher is valid
  function applyVoucher() {
    let validVoucher = VoucherService.validVoucher(voucher, listVouchers, listAppliedVouchers);
    if (validVoucher.valid === true) {
      dispatch({ type: "APPLY_VOUCHER", voucher: validVoucher.voucher });
      setApplied(true);
      setTimeout(function(){
        setApplied(false);
      } , 3000);
    }
    else{
      setNotApplied(true);
      setTimeout(function(){
        setNotApplied(false);
      } , 3000);
    }
  }

  return (
    <div className="Vouchers">
      { loadedWithoutErrors && 
        <div class="vouchers-area">
          <input
            class="voucher-input"
            type="text"
            placeholder="Have an discount code?"
            onChange={(e) => setVoucher(e.target.value)}
          />
          {(!applied && !notApplied) &&
            <button class="voucher-apply" onClick={applyVoucher}> Apply </button>
          }
          {(applied) &&
            <button class="voucher-applied"> Applied! </button>
          }
          {(notApplied) &&
            <button class="voucher-not-applied"> Invalid! </button>
          }

        </div>
      }

      {!loadedWithoutErrors && 
        <div class="voucher-retry-reload">
        <div class="voucher-error-text">
            An error ocurred. We aren't able to get the vouchers list :(
        </div>
        <button class="voucher-try-again" onClick={fetchData}> Try Again! </button>
    </div> 
      }
      
      
    </div>
  );
};

export default Vouchers;
