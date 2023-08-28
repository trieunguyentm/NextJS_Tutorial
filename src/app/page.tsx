import Link from 'next/link'
import borderColor from '../styles/app.module.css'

export default function Home() {
  return (
    <div style={{ marginLeft: '40px' }}>
      <ul>
        <li style={{ margin: "20px 0" }} className={borderColor['red-border']}>
          <Link href={"/facebook"}>Facebook</Link>
        </li>
        <li style={{ margin: "20px 0" }} className={borderColor['green-border']}>
          <Link href={"/youtube"}>Youtube</Link>
        </li>
        <li style={{ margin: "20px 0" }} className={borderColor['blue-border']}>
          <Link href={"/tiktok"}>Tiktok</Link>
        </li>
      </ul>
    </div>
  )
}
