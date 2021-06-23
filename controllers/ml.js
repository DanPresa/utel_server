const { response } = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: 10 });

const search = async (req, res = response) => {
	const { q, sort } = req.query;
	const condition = req.query.condition;
	// const limit = req.query.limit || 30;
	// `https://api.mercadolibre.com/sites/MLA/search?q=${q}&sort=${sort}&condition=${condition}`

	const nameCache = q.toString().split(' ').join('-');

	try {
		if (myCache.has(nameCache)) {
			return res.status(200).json({
				ok: true,
				data: myCache.get(nameCache),
			});
		} else {
			const { data } = await axios.get(
				`https://api.mercadolibre.com/sites/MLA/search?q=${q}&sort=${sort}&condition=${condition}`
			);

			myCache.set(nameCache, data);

			res.status(200).json({
				ok: true,
				data,
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Something went wrong',
		});
	}
};

const getProduct = async (req, res = response) => {
	const { product_id } = req.params;

	const nameCache = product_id;

	try {
		if (myCache.has(nameCache)) {
			return res.status(200).json({
				ok: true,
				data: myCache.get(nameCache),
			});
		} else {
			const { data } = await axios.get(
				`https://api.mercadolibre.com/products/${product_id}`
			);

			myCache.set(nameCache, data);

			res.status(200).json({
				ok: true,
				data,
			});
		}
	} catch (error) {
		res.status(500).json({
			ok: false,
			msg: 'Something went wrong',
		});
	}
};

module.exports = {
	search,
	getProduct,
};
