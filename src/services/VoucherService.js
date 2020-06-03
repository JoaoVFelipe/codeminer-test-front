class VoucherService {
    //Get vouchers from API
    async getVouchers(){
        const response = await fetch('https://shielded-wildwood-82973.herokuapp.com/vouchers.json');
        if(!response.ok){
            return null;
        }
        const json = await response.json();
        return json;
    }

    //Valid the voucher applied
    validVoucher(voucherCode, listVouchers, listAppliedVouchers){
        let exist = false;
        let applied = false;
        let voucherData = {};

        //Verify if it exists
        listVouchers.map((voucher) => {
            if(voucherCode === voucher.code){
                exist = true;
                voucherData = voucher;
            }
        });

        if(exist){
            //Verify if isn't already applied
            listAppliedVouchers.map((appliedVoucher) => {
                if(voucherCode === appliedVoucher.code){
                    applied = true;
                }
            });
            if(applied){
                return {valid: false, state: "ALREADY_APPLIED", voucher: voucherData};
            }
            else{
                return {valid: true, state: "VALID", voucher: voucherData};
            }
        }
        else{
            return {valid: false, state: "NOT_EXIST", voucher: {}};
        }
       
    }

}

const instance = new VoucherService();
export { instance as VoucherService };