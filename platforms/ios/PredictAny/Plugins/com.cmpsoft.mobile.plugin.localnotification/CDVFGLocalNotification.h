//
//  LocalNotification.h
//	Phonegap LocalNotification Plugin
//	Copyright (c) Greg Allen 2011 & 2012 Drew Dahlman
//	MIT Licensed

#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>

@interface CDVFGLocalNotification : CDVPlugin {
    NSMutableArray *notiArray;
}
- (void)add:(CDVInvokedUrlCommand*)command;
- (void)cancel:(CDVInvokedUrlCommand*)command;
- (void)cancelAll:(CDVInvokedUrlCommand*)command;

@end
