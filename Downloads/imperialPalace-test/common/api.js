import Request from '@/utils/request.js'
let http = new Request().http

export default {
	// main.js
	getPicture() {
		return http({
			url: '/travel2/backend/cultureTutor/getCultureTutorList.php',

		})
	},
	getPicture2() {
		return http({
			url: '/travel2/backend/cultureLocation/getCultureLocationList.php',
	
		})
	},
	postPicture(dataUrl) {
		// https://www.rykerfeng.cn/travel2/backend/test/uploadImg.php
		return http({
			url: '/travel2/backend/test/uploadImg.php',
		})
	}
}