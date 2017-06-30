import widgets from '../../../models/widgets'

export default (router) => {
	router.get('/', async (req, res) => {
		const data = await widgets.getWidgets(req.user.id)
		res.json(data)
	})
}
