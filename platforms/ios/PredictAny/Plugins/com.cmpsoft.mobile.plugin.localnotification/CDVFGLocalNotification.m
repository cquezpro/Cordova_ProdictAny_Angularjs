//
//  CDVFGLocalNotification.m
//	Phonegap CDVFGLocalNotification Plugin
//	Copyright (c) Greg Allen 2011 & 2012 Drew Dahlman
//	MIT Licensed

#import "CDVFGLocalNotification.h"


@implementation CDVFGLocalNotification
- (void)add:(CDVInvokedUrlCommand*)command {
	NSMutableDictionary *options = [command.arguments objectAtIndex:0];
    NSMutableDictionary *repeatDict = [[NSMutableDictionary alloc] init];
    [repeatDict setObject:[NSNumber numberWithInt:NSDayCalendarUnit] forKey:@"daily"];
    [repeatDict setObject:[NSNumber numberWithInt:NSWeekCalendarUnit] forKey:@"weekly"];
    [repeatDict setObject:[NSNumber numberWithInt:NSMonthCalendarUnit] forKey:@"monthly"];
    [repeatDict setObject:[NSNumber numberWithInt:NSYearCalendarUnit] forKey:@"yearly"];
    [repeatDict setObject:[NSNumber numberWithInt:0] forKey:@""];

    // notif settings
	double timestamp = [[options objectForKey:@"date"] doubleValue];
	NSString *msg = [options objectForKey:@"message"];
	NSString *action = [options objectForKey:@"action"];
	NSString *notificationId = [options objectForKey:@"id"];
    NSInteger cancelId = [[options objectForKey:@"id"]intValue];
    NSString *sound = [options objectForKey:@"sound"];
    NSString *bg = [options objectForKey:@"background"];
    NSString *fg = [options objectForKey:@"foreground"];
    NSString *repeat = [options objectForKey:@"repeat"];
	NSInteger badge = [[options objectForKey:@"badge"] intValue];
	bool hasAction = ([[options objectForKey:@"hasAction"] intValue] == 1)?YES:NO;
	
	NSDate *date = [NSDate dateWithTimeIntervalSince1970:timestamp];
	
	UILocalNotification *notif = [[UILocalNotification alloc] init];
	notif.fireDate = date;
	notif.hasAction = hasAction;
	notif.timeZone = [NSTimeZone defaultTimeZone];
    notif.repeatInterval = [[repeatDict objectForKey: repeat] intValue];
	
	notif.alertBody = ([msg isEqualToString:@""])?nil:msg;
	notif.alertAction = action;

    notif.soundName = sound;
    notif.applicationIconBadgeNumber = badge;
	
	NSDictionary *userDict = [NSDictionary dictionaryWithObjectsAndKeys:notificationId,@"notificationId",bg,@"background",fg,@"foreground",nil];
    notif.userInfo = userDict;
    
    [self cancelById:cancelId];
    
    NSMutableArray *array = [[NSMutableArray alloc]init];
	[array addObject:notif];
    notiArray = array ;
	[[UIApplication sharedApplication] scheduleLocalNotification:notif];
	NSLog(@"Notification Set: %@ (ID: %@, Badge: %i, sound: %@,background: %@, foreground: %@)", date, notificationId, badge, sound,bg,fg);
	//[notif release];
}

//通过在add中增加删除功能（by id）
-(void)cancelById:(NSInteger)cancelId{
    NSInteger notid = [notiArray count];
    for (int i = 0; i < notid; i++) {
        UILocalNotification *notif = [notiArray objectAtIndex:i];
        NSInteger noid = [[notif.userInfo objectForKey:@"notificationId"] intValue];
        if (noid ==cancelId) {
            [[UIApplication sharedApplication] cancelLocalNotification:notif];
            [notiArray removeObjectAtIndex:i];
            NSLog(@"cancelLocalNotification  success  by cancelId");
        }
    }
}

//如果通过上一方法 该方法就无需
- (void)cancel:(CDVInvokedUrlCommand*)command {
    NSInteger notificationId = [[[command.arguments objectAtIndex:0] objectForKey:@"id"] intValue];
    [self cancelById:notificationId];
}

- (void)cancelAll:(CDVInvokedUrlCommand*)command {
	NSLog(@"All Notifications cancelled");
    [UIApplication sharedApplication].applicationIconBadgeNumber=0;
	[[UIApplication sharedApplication] cancelAllLocalNotifications];
}



@end
