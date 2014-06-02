//
//  MUNetworkManager.h
//  MUAPI
//
//  Created by Администратор on 3/24/14.
//  Copyright (c) 2014 Администратор. All rights reserved.
//

#import "AFHTTPRequestOperationManager.h"

typedef void(^ErrorBlock)(NSError *error);
typedef void(^RequestCompletionBlock)(NSArray *);
typedef void (^DeleteRequestCompletionBlock)(BOOL isDeleteSuccess, NSError *error);

/**
 This class represents a network manager, which is responsible for requesting and receiving data from server
 
 Use it's methods and may the force be with you!
 
 */


@interface MUNetworkManager : AFHTTPRequestOperationManager

/**
 @name Requesting data from server methods
 */


/**
 This method provides a global entry point to our network manager
 */

+ (instancetype)sharedInstance;

/**
 @name Grabbing collection with specific name from server
 */


/**
 @param collectionName Name of collection to grab
 @param completion Block to be executed after successful request completion
 @param errorBlock Block to be executed when error occurs
 */

- (void)collectionWithName: (NSString *)collectionName
            withCompletion: (RequestCompletionBlock)completion
          withFailureBlock: (ErrorBlock)errorBlock;

/**
 @name Grabbing collection item with specific identifier from collection with specific name from server
 */


/**
 @param collectionName Name of collection to grab
 @param itemID Item identifier
 @param completion Block to be executed after successful request completion
 @param errorBlock Block to be executed when error occurs
 */


- (void)collectionItemFromCollectionWithName: (NSString *)collectionName
                                      withID: (NSString *)itemID
                              withCompletion: (RequestCompletionBlock)completion
                            withFailureBlock: (ErrorBlock)errorBlock;

/**
 @name Creating collection item with specific fields on server side
 */


/**
 @param collectionName Name of collection to grab
 @param fields Dictionary containing user fields
 @param completion Block to be executed after successful request completion
 @param errorBlock Block to be executed when error occurs
 */

- (void)createCollectionItemFromCollectionWithName: (NSString *)collectionName
                                        withFields: (NSDictionary *)fields
                                    withCompletion: (RequestCompletionBlock)completion
                                  withFailureBlock: (ErrorBlock)errorBlock;

/**
 @name Setting values for collection item with specific fields on server side
 */


/**
 @param collectionName Name of collection to grab
 @param itemID Item identifier
 @param values Dictionary containing new values for collection item fields
 @param completion Block to be executed after successful request completion
 @param errorBlock Block to be executed when error occurs
 */



- (void)setValuesForItemFormCollectionWithName: (NSString *)collectionName
                                    withItemID: (NSString *)itemID
                                        values: (NSDictionary *)values
                                withCompletion: (RequestCompletionBlock)completion
                              withFailureBlock: (ErrorBlock)errorBlock;


/**
 @name Deleting collection item with specific identifier from server
 */


/**
 @param collectionName Name of collection to grab
 @param itemID Item identifier
 @param completion Block to be executed when request finishes. Returns YES and nil error in case of success, otherwise returns NO and error
 */


- (void)deleteCollectionItemFromCollectionWithName: (NSString *)collectionName
                                        withItemID: (NSString *)itemID
                                    withCompletion: (DeleteRequestCompletionBlock)completion;
@end
