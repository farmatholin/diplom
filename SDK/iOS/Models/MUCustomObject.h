//
//  MUCustomObject.h
//  MUAPI
//
//  Created by Администратор on 3/28/14.
//  Copyright (c) 2014 Администратор. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 This class represents a convenient data model for SDK user
 
 Use it and may the force be with you!
 
 */


@interface MUCustomObject : NSObject

/**
 This property stores the date of custom object creation on server. Cannot be modified.
 */

@property (nonatomic, strong, readonly) NSDate *dateCreated;

/**
 This property stores the date of custom object last modification on server. Cannot be modified.
 */

@property (nonatomic, strong, readonly) NSDate *dateUpdated;

/**
 This property stores the identifier of custom object on server. Cannot be modified.
 */

@property (nonatomic, strong, readonly) NSString * objectID;

/**
 This property contains dictionary with user-defined custom  fields
 */

@property (nonatomic, strong) NSMutableDictionary *fields;

+ (MUCustomObject *)customObjectFromDictionary: (NSDictionary *)dict;
@end
