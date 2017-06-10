'use strict';

var eventEmitter = require('events').EventEmitter;
var util = require('util');

var mycTabs = function (settings) {
    
    this.tabObject=null;
    this.tabContent=null;
    
    var s = settings || {};
    var def = {
        initialized: function () {},
        onBeforeOpen: function () {},
        onAfterOpen: function () {},
        onBeforeClose: function () {},
        onAfterClose: function () {},
        onBeforeShow: function () {},
        onAfterShow: function () {}
    }
    mycTabs.prototype._settings = $.merge(def, s);
    var s = $(this);
    $.each(s, function (i, e) {
        mycTabs.prototype.initialize(e);
    })

};

util.inherits(mycTabs, eventEmitter);

mycTabs.prototype.initialize = function (s) {
    var d = s;

    this.tabObject = $('.nav-tabs', d);
    this.tabContent = $('.tab-panes', d);
    
    this.tabObject.on('click', '.tab:not(.active)', function (e) {
        e.preventDefault();
        mycTabs.prototype.show($(this));
    });
    
    this.tabObject.on('click', '.tab-close', function (e) {
        e.preventDefault();
        e.stopPropagation();
        mycTabs.prototype.close($(this).closest('.tab'));
    });
    
    mycTabs.prototype._settings.initialized();

};

mycTabs.prototype.show = function (self) {
    var id = self.attr('data-tab-id');
    mycTabs.prototype._settings.onBeforeShow(id,self);
    mycTabs.prototype.tabObject.find('.active').removeClass('active');
    mycTabs.prototype.tabContent.find('.active').removeClass('active');
    mycTabs.prototype.tabContent.find('.tab-pane[data-tab-id=' + id + ']').addClass('active');
    self.addClass('active');
    mycTabs.prototype._settings.onAfterShow(id,self);
};

mycTabs.prototype.close = function (self) {
    
    var id = self.attr('data-tab-id');
    mycTabs.prototype._settings.onBeforeClose(id,self);
    
    if(self.hasClass('active')){
        self.remove();
        mycTabs.prototype.tabContent.find('.tab-pane[data-tab-id=' + id + ']').remove();
        mycTabs.prototype._settings.onAfterClose(id,self);
        mycTabs.prototype.showFirst();
    }else{
        self.remove();
        mycTabs.prototype.tabContent.find('.tab-pane[data-tab-id=' + id + ']').remove();
        mycTabs.prototype._settings.onAfterClose(id);
    }
   
    
};

mycTabs.prototype.showFirst = function () {
    if(mycTabs.prototype.tabObject.find('.tab').length>0){
        mycTabs.prototype.show(mycTabs.prototype.tabObject.find('.tab:first'));
    }
};

$.fn.mycTabs = mycTabs;

$('.tab-view').mycTabs();