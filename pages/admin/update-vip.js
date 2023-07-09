import { React, useState, useEffect } from "react"
import CallApi from '../api/call_api';
import { useRouter } from 'next/router';
import { ConvertIntToDate } from '../../utils/function'
import { useForm } from 'react-hook-form'
import HeaderAdmin from "../../components/headerAdmin";
import Cookies from "js-cookie";

export default function UpdateVip() {
    if (!Cookies.get('admin')) {
        // window.location.href = '/admin'
    }

    const { register, handleSubmit } = useForm();
    const onSubmit = async data => {
        data.com_id = id
        let result = await CallApi.updateVip(data)
        if (result.data && result.data.data.result == true) {
            alert('Cập nhật thành công')
            window.location.reload()
        } else {
            alert(result)
        }
    };
    const router = useRouter()
    const { id } = router.query
    const [listCom, getlistCom] = useState({})
    const [isLoad, getIsLoad] = useState(false)
    useEffect(() => {
        if (id) {
            const getData = async () => {
                let data = {
                    com_id: id
                }
                try {
                    let response = await CallApi.listCom(data)
                    getlistCom(response.data.data.data[0])
                } catch (error) {
                    console.log(error)
                }
                getIsLoad(true)
                console.log(data)
            }
            getData()
        }
    }, [id])
    if (!isLoad) {
        return
    }

    return (
        <>
            <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
            <title>Administrator</title>
            {/* <base href="https://vieclamtaihanoi.com.vn/" /> */}
            {/* <link href="#" rel="shortcut icon" /> */}
            <link rel="stylesheet" href="../css/admin.css" type="text/css" />

            <HeaderAdmin />

            <div className="content-inner">
                <h3 className="header">Thay đổi số lượng tài khoản và thời hạn sử dụng vip công ty - ID: {id}</h3>
                <div className="content-inner">
                    <form onSubmit={handleSubmit(onSubmit)} name="frmChangeSl" method="post">
                        <input type="hidden" name="id" value="118277" />
                        <div className="gray">
                            <table className="tab1">
                                <tbody>
                                    <tr className="second">
                                        <td width="200"><strong>Số lượng tài khoản: </strong></td>
                                        <td>
                                            <input type="text" name="com_ep_vip" id="so_luong" placeholder="Vui lòng nhập số lượng" defaultValue={listCom.inForCompany && listCom.inForCompany.cds.com_ep_vip}
                                                {...register("com_ep_vip", {
                                                })}
                                            />
                                        </td>
                                    </tr>
                                    <tr className="second">
                                        <td width="200"><strong>Thời hạn sử dụng: </strong></td>
                                        <td>
                                            <input type="date" name="com_vip_time" id="thoi_han" placeholder="Vui lòng nhập thời hạn" defaultValue={(ConvertIntToDate(listCom.inForCompany.cds.com_vip_time))[1]}
                                                {...register("com_vip_time", {
                                                })}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="gray">
                            <center>
                                <input className="button" type="submit" name="submit" value="Lưu thay đổi" />
                            </center>
                        </div>
                    </form>
                    <div className="clr"></div>
                </div>
            </div>
        </>
    )
}