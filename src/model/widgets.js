var jdbc = require('../lib/jdbc.js');
import jdbc from './lib/jdbc'

/**
 * Get user widgets
 * @param  {String} userId
 * @return {Promise}
 */

const Widgets = {}
Widgets.getWidgets = async function(userId) {
	return await jdbc.query('select * from t_widget A left join t_widget_config B on A.id = B.widgetId where userId =? order by x,y', [userId])
};
export default Widgets
