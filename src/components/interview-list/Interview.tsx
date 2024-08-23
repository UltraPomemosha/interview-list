import { useNotificationsStore } from "@/stores/notifications"
import { css, initCL } from "@/utils/css"
import UDeleteIcon from "@c/ui/u-icons/UDeleteIcon"
import UEditIcon from "@c/ui/u-icons/UEditIcon"
import UPhoneIcon from "@c/ui/u-icons/UPhoneIcon"
import UTelegramIcon from "@c/ui/u-icons/UTelegramIcon"
import UWhatsappIcon from "@c/ui/u-icons/UWhatsappIcon"
import { Link } from "react-router-dom"
import { COLUMNS } from "../statistic/support"
import styles from "./interview-list.module.scss"
import { COPY_MESSAGE, InterviewProps } from "./support"

const cl = initCL("interview", styles)

function Interview({ id, company, contacts, description, tel, telegram, whatsapp, result, onDeleteCLick }: InterviewProps) {
  const updateNotifications = useNotificationsStore((state) => state.updateNotifications)

  const copyTel = (tel: string) => {
    navigator.clipboard.writeText(tel)
    updateNotifications({
      id: Math.random() + Date.now(),
      type: "message",
      global: true,
      description: COPY_MESSAGE,
    })
  }

  return (
    <article className={cl()}>
      <p className={cl("item")}>{company}</p>
      <div className={cl("item")}>
        <a href={description} className={cl("link")}>
          {description}
        </a>
      </div>
      <p className={cl("item", "name")}>{contacts}</p>
      <div className={cl("item", "item-container")}>
        <a href={`t.me/${telegram}`} className={cl("svg-link")}>
          <UTelegramIcon />
        </a>
        <a href={`https://wa.me/${whatsapp}`} className={cl("svg-link")}>
          <UWhatsappIcon />
        </a>
        <button onClick={() => copyTel(tel)} className={cl("svg-link")}>
          <UPhoneIcon />
        </button>
      </div>
      <p className={`${cl("item")} ${css(styles, '_' + result)}`}>
        {COLUMNS.find((el) => el.type === result)?.title}
      </p>
      <div className={cl("item", "item-container")}>
        <button onClick={() => onDeleteCLick(id, company)} className={cl("delete")}>
          <UDeleteIcon />
        </button>
        <Link to={`${id}`} className={cl("edit")}>
          <UEditIcon />
        </Link>
      </div>
    </article>
  )
}

export default Interview
