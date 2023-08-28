'use client'
import AppTable from '@/components/app.table';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <ul>
        <li style={{ margin: "20px 0" }}>
          <Link href={"/facebook"}>Facebook</Link>
        </li>
        <li style={{ margin: "20px 0" }} >
          <Link href={"/youtube"}>Youtube</Link>
        </li>
        <li style={{ margin: "20px 0" }} >
          <Link href={"/tiktok"}>Tiktok</Link>
        </li>
      </ul>
      <AppTable />
    </div>
  )
}
