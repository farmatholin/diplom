//
//  MUCustomObject.m
//  MUAPI
//
//  Created by Администратор on 3/28/14.
//  Copyright (c) 2014 Администратор. All rights reserved.
//

#import "MUCustomObject.h"

static NSString *kIdentifier    = @"_id";
static NSString *kDateCreate    = @"dateCreate";
static NSString *kDateUpdated   = @"dateUpdated";

@interface MUCustomObject ()

@property (nonatomic, strong, readwrite) NSDate *dateCreated;

@property (nonatomic, strong, readwrite) NSDate *dateUpdated;

@property (nonatomic, strong, readwrite) NSString * objectID;


@end

@implementation MUCustomObject

- (NSMutableDictionary *)fields
{
    if (!_fields)
    {
        _fields = [NSMutableDictionary new];
    }
    
    return _fields;
}

+ (MUCustomObject *)customObjectFromDictionary: (NSDictionary *)dict
{
    NSMutableDictionary *resultDict = dict.mutableCopy;
    
    if (!resultDict)
    {
        return nil;
    }
    
    MUCustomObject *customObject    = [MUCustomObject new];
    
    customObject.dateCreated        = resultDict[kDateCreate];
    [resultDict removeObjectForKey: kDateCreate];
    
    customObject.dateUpdated        = dict[kDateUpdated];
    [resultDict removeObjectForKey: kDateUpdated];
    
    customObject.objectID           = dict[kIdentifier];
    [resultDict removeObjectForKey: kIdentifier];
    
    
    [customObject.fields addEntriesFromDictionary: resultDict];
    
    return customObject;
}

@end
