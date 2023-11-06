import dotenv from 'dotenv'

dotenv.config()

export default (code: any) => {
	console.log('code', code)

	const appUrl = process.env.APP_URL_FRONTEND
	const singUpLink = `${appUrl}/confirm`

	return `Hello,
  <p>
You are receiving this because you requested to create an account on Our membership platform.
    <br><br>
Please, copy this code <b style="font-weight:bold;font-size:15px"> ${code} </b> and click on the link bellow to activate your account!
    <br><br><br>
    <a
      href='${singUpLink}'
      style="margin:30px 0;padding:15px 35px;background:#28abe3;color:#ffffff;clear:both;border-radius:30px;text-decoration:none"
      target='_blank'
    >
      Activate account Now
    </a>
  </p>`
}
