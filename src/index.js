'use strict'
/* jslint node: true */
/* jshint esversion: 6 */
/* globals $ */

/**
 * dependencies
 */
const SerialPort = require('serialport')
const Mustache = require('mustache')

/**
 * global constants
 */
const SERIAL_BAUDRATE = 9600

/**
 * global variables
 * boolean SerialPort.isOpen      Read Only
 * string SerialPart.path         Read Only
 */
let port // hold a global instance for the opened Serial Port

/**
 * utility functions
 */
function getMsgTimestamp() {
  return Date(Date.now()).toString().slice(15, -15)
}

/**
 * utility functions for serial communication
 */
function openSerialPort(portname) {
  port = new SerialPort(portname, {
    baudRate: SERIAL_BAUDRATE,
    autoOpen: true,
    parser: SerialPort.parsers.readline('\n')
  })

  port.on('open', function() {
    // console.log('Successfully open port: ' + port.path)
    // console.log('isOpen: ' + port.isOpen)
    console.log('Serial port is Open.')
  })

  port.on('error', function(err) {
    console.log('Error: ', err.message)
  })

  port.on('data', function(data) {
    /**
     * lin msg data template
     * received from lin box
    */
    // let msg = {
    //   'timestamp': timestamp,
    //   'msg-id': '0x01',
    //   'msg-data': ['0x01', '0x02', '0x03', '0x04', '0x05', '0x06', '0x07', '0x08'],
    //   'msg-checksum': '0xFF',
    //   'msg-status': 'OK'
    // }

    console.log('original data: ' + data)
    let timestamp = getMsgTimestamp()
    let status = 'OK'

    if(isJSON(data)) data = JSON.parse(data)
    console.log('parsed data:' + data)

    let msg = {
      'timestamp': timestamp,
      'msg-id': data['msg-id'],
      'msg-data': data['msg-data'],
      'msg-checksum': data['msg-checksum'],
      'msg-status': status
    }

    // let msg = {
    //   'timestamp': timestamp,
    //   'msg-id': '0x01',
    //   'msg-data': ['0x01', '0x02', '0x03', '0x04', '0x05', '0x06', '0x07', '0x08'],
    //   'msg-checksum': '0xFF',
    //   'msg-status': 'OK'
    // }

    console.log(msg)
    $write2Table(msg)
  })
}

function closeSerialPort(portname) {

}

/**
 * An utility funtion to validate a JSON string
 */
function isJSON(jsonString) {
  try {
    let o = JSON.parse(jsonString)
    if(o && typeof o === 'object') {
      return true
    }
  } catch(e){ }
  return false
}

function leftPad(number, targetLength) {
  var output = number + ''
  while (output.length < targetLength) {
    output = '0' + output
  }
  return output
}

/*
 * Frame Monitor
 * DOM cache
 */
let $frameMonitorSegment = $('#frame-monitor-segment')
let $linMsgTable = $('#lin-msg-table')
let $linMsgTemplate = $('#lin-msg-template')

/*
 * Frame Monitor
 * jQuery functions
 */
function $write2Table(msg) {
  let linMsgTemplate = {
    'timestamp': '+20',
    'msgId': '0x01',
    'msgData': ['0x01', '0x02', '0x03', '0x04', '0x05', '0x06', '0x07', '0x08'],
    'msgChecksum': '0xFF',
    'msgStatus': 'OK'
  }

  $linMsgTable.append(Mustache.render($linMsgTemplate.html(), msg))
}

function ClearTable() {
  $linMsgTable.clear()
}

function saveTable2File() {

}


// jQuery document ready
$(function() {

  /*
   * Menu Bar
   * DOM cache
   */
  let $refreshBtn = $('#refresh-btn')
  let $menuBar = $('#menu-bar')

  /*
   * Menu Bar
   * jQuery functions
   */
  $refreshBtn.on('click', function() {
    refreshDeviceList()
  })

  /*
   * Device List
   * DOM cache
   */
  let $devices = $('#device-list')
  let $deviceTemplate = $('#device-template')

  /*
   * Device List
   * jQuery functions
   */
  function updateDeviceItemInfo(port) {
    console.log(port.comName)
    console.log(port.manufacturer)
    console.log(port.serialNumber)

    let serialPortTemplate = {
      'portname': port.comName,
      'manufacturer': port.manufacturer,
      'serial-number': port.serialNumber,
      'baudrate': SERIAL_BAUDRATE,
      'status': 'Connect'
    }
    console.log($deviceTemplate.html())
    $devices.append(Mustache.render($deviceTemplate.html(), serialPortTemplate))
  }

  function refreshDeviceList() {
    $devices.empty()

    SerialPort.list(function(err, ports) {
      for (let port of ports) {
        updateDeviceItemInfo(port)
      }
    })
  }

  function connectToDevice(portname) {
    port = openSerialPort(portname)
  }

  function disconnectFromDevice() {

  }

  $devices.on('click', '.button', function() {
    // let portname = $(this).parents('.card').find('.header').html()
    // if(SerialPort.isOpen){
    //   $(this).addClass('disabled')
    // } else {
    //   $(this).removeClass('disabled')
    // }
    $(this).addClass('disabled')

    let portname = $(this).data('portname')
    console.log('which port:' + portname)
    // portname = '/dev/cu.usbmodem14131'
    connectToDevice(portname)
  })

})
