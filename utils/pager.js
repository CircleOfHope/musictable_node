
var Pager = function(options) {
	var pager = this;
	var options = options || {};

	pager.perPage = options.perPage || 50;
	pager.page = parseInt(options.page) || 1;
	pager.offset = (pager.page - 1) * pager.perPage;
};

Pager.prototype.paginate = function(count) {
	var pager = this;
	pager.isPaginated = (count > pager.perPage);
	pager.totalPages = Math.ceil(count / pager.perPage);
	pager.hasPrevious = (pager.page > 1);
	pager.previousPage = pager.hasPrevious ? pager.page - 1 : 1;
	pager.hasNext = (pager.page < pager.totalPages);
	pager.nextPage = pager.hasNext ? pager.page + 1 : pager.totalPages;
}

module.exports = Pager;