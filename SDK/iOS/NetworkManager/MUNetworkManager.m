//
//  MUNetworkManager.m
//  MUAPI
//
//  Created by Администратор on 3/24/14.
//  Copyright (c) 2014 Администратор. All rights reserved.
//

#import "MUNetworkManager.h"
#import "MUCustomObject.h"

static NSString *TEST_API_KEY = @"532f4e8641262d8fe34d7bcd";
static NSString *BASE_URL_STRING = @"http://access-farmathapiserver.rhcloud.com/data/";

@implementation MUNetworkManager

- (instancetype)initWithBaseURL:(NSURL *)url
{
    if (self = [super initWithBaseURL: url])
    {
        self.securityPolicy.allowInvalidCertificates = YES;
        
        [self.requestSerializer setValue: TEST_API_KEY
                      forHTTPHeaderField: @"API-KEY"];

    }
    
    return self;
}

+ (instancetype)sharedInstance
{
    static id instance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        instance = [[self alloc] initWithBaseURL:[NSURL URLWithString: BASE_URL_STRING]];
    });
    return instance;
}

- (NSArray *)parseCustomObjectResponse : (id)responseObject
{
    NSArray *result = (NSArray *)responseObject;
    
    NSMutableArray *resultArray = [NSMutableArray new];
    
    for (NSDictionary *dict in result)
    {
        MUCustomObject *customObject = [MUCustomObject customObjectFromDictionary: dict];
        [resultArray addObject: customObject];
    }
    
    return resultArray;
}


- (void)collectionWithName: (NSString *)collectionName
            withCompletion: (RequestCompletionBlock)completion
          withFailureBlock: (ErrorBlock)errorBlock
{
    [self GET: collectionName
   parameters: nil
      success: ^(AFHTTPRequestOperation *operation, id responseObject) {
          
          NSLog(@"Response: %@", responseObject);
          
          NSArray *response = [self parseCustomObjectResponse: responseObject];
          
          if (completion)
          {
              completion(response);
          }
          
      }
      failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
          
          NSLog(@"Error: %@", error);
          
          
          if (errorBlock)
          {
              errorBlock(error);
          }

      }];
}

- (void)collectionItemFromCollectionWithName: (NSString *)collectionName
                                      withID: (NSString *)itemID
                              withCompletion: (RequestCompletionBlock)completion
                            withFailureBlock: (ErrorBlock)errorBlock
{
    NSString *resultStringURL = [NSString stringWithFormat: @"%@/%@",collectionName,itemID];
    [self GET: resultStringURL
   parameters: nil
      success: ^(AFHTTPRequestOperation *operation, id responseObject) {
          
          NSLog(@"Response: %@", responseObject);
          
          NSArray *response = [self parseCustomObjectResponse: responseObject];
          
          if (completion)
          {
              completion(response);
          }
      }
      failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
          
          NSLog(@"Error: %@", error);
          
          
          if (errorBlock)
          {
              errorBlock(error);
          }
      }];
}

- (void)createCollectionItemFromCollectionWithName: (NSString *)collectionName
                                        withFields: (NSDictionary *)fields
                                    withCompletion: (RequestCompletionBlock)completion
                                  withFailureBlock: (ErrorBlock)errorBlock
{
    [self POST: collectionName
    parameters: fields
       success: ^(AFHTTPRequestOperation *operation, id responseObject) {
           
           NSLog(@"Response: %@", responseObject);
           
           NSArray *response = [self parseCustomObjectResponse: responseObject];
           
           if (completion)
           {
               completion(response);
           }
           
       }
       failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
           
           NSLog(@"Error: %@", error);
           
           
           if (errorBlock)
           {
               errorBlock(error);
           }
           
       }];
}

- (void)setValuesForItemFormCollectionWithName: (NSString *)collectionName
                                    withItemID: (NSString *)itemID
                                        values: (NSDictionary *)values
                                withCompletion: (RequestCompletionBlock)completion
                              withFailureBlock: (ErrorBlock)errorBlock
{
    NSString *resultStringURL = [NSString stringWithFormat:@"%@/%@",collectionName,itemID];

    [self PUT: resultStringURL
   parameters: values
      success: ^(AFHTTPRequestOperation *operation, id responseObject) {
          
          NSLog(@"Response: %@", responseObject);
          
          NSArray *response = [self parseCustomObjectResponse: responseObject];
          
          if (completion)
          {
              completion(response);
          }
          
      }
      failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
          
          NSLog(@"Error: %@", error);
          
          
          if (errorBlock)
          {
              errorBlock(error);
          }
          
      }];
}

- (void)deleteCollectionItemFromCollectionWithName: (NSString *)collectionName
                                        withItemID: (NSString *)itemID
                                    withCompletion: (DeleteRequestCompletionBlock)completion
{
    NSString *resultStringURL = [NSString stringWithFormat:@"%@/%@",collectionName,itemID];
    [self DELETE: resultStringURL
      parameters: nil
         success: ^(AFHTTPRequestOperation *operation, id responseObject) {
             
             if (completion)
             {
                 completion(YES, nil);
             }
             
         }
         failure: ^(AFHTTPRequestOperation *operation, NSError *error) {
             
             NSLog(@"Error: %@", error);
             
             if (completion)
             {
                 completion(NO, error);
             }
            
         }];
}


@end
