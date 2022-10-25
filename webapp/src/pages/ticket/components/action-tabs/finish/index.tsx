import { updateTicket } from "@/services/api/ticket/index";
import { Button, message } from "antd"
import { useParams } from "umi"
import "./style.less"

export default function FinishTicket() {
    const params = useParams<any>();
    const handleCloseTicket = async () => {
        const dataUpdateTicket = {
            statusName: "Closed"
        }
        const res = await updateTicket(params.id, dataUpdateTicket);
        if (res.id) {
            message.success("Ticket chuyển sang trạng thái đóng")
        }
    }
    return <div className="close-ticket-wrapper">
        <div className="btn-actions">
            <Button onClick={handleCloseTicket} type="primary">Đóng ticket</Button>
        </div>
    </div>
}