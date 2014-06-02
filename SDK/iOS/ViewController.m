//
//  ViewController.m
//  MUAPI
//
//  Created by Администратор on 3/24/14.
//  Copyright (c) 2014 Администратор. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear: animated];
    
//    [[MUNetworkManager sharedInstance] collectionWithName: @"ios"
//                                           withCompletion: ^(NSArray *response) {
//                                               
//                                               NSLog(@"Response: %@", response);
//
//                                           }
//                                         withFailureBlock: ^(NSError *error) {
//                                             
//                                             NSLog(@"Error: %@",error);
//
//                                         }];
    
    
//    [[MUNetworkManager sharedInstance] collectionItemFromCollectionWithName: @"ios"
//                                                                     withID: @"532f4ec1000000c41d000002"
//                                                             withCompletion: ^(NSDictionary *result) {
//                                                                 
//                                                                 NSLog(@"result: %@",result);
//
//                                                             }
//                                                           withFailureBlock: ^(NSError *error) {
//                                                               
//                                                               NSLog(@"error: %@",error);
//
//                                                               
//                                                             }];
    
//    [[MUNetworkManager sharedInstance] createCollectionItemFromCollectionWithName: @"ios"
//                                                                       withFields: @{@"name" : @"valera",
//                                                                                    @"age"   : @42}
//     
//                                                                   withCompletion:^(NSDictionary *result) {
//                                                                       
//                                                                     NSLog(@"result: %@",result);
//
//                                                                   }
//                                                                 withFailureBlock:^(NSError *error) {
//                                                                      NSLog(@"error: %@",error);
//                                                                 }];
    
//    [[MUNetworkManager sharedInstance] setValuesForItemFormCollectionWithName: @"ios"
//                                                                   withItemID: @"5330b5290000009ee4000002"
//                                                                       values: @{@"name" : @"ARCHER", @"age" : @30}
//                                                               withCompletion: ^(NSDictionary *result) {
//                                                                   
//                                                                   NSLog(@"Result: %@",result);
//
//                                                               }
//                                                             withFailureBlock: ^(NSError *error) {
//                                                                
//                                                                 NSLog(@"error: %@",error);
//
//                                                                 
//                                                             }];
    
//    [[MUNetworkManager sharedInstance] deleteCollectionItemFromCollectionWithName:@"ios"
//                                                                       withItemID:@"532f4ec1000000c41d000002"
//                                                                   withCompletion:^(NSDictionary *result) {
//                                                                       
//                                                                       NSLog(@"Result: %@",result);
//                                                                       
//                                                                   } withFailureBlock:^(NSError *error) {
//                                                                       
//                                                                       NSLog(@"error: %@",error);
//                                                                       
//                                                                   }];
    
    [[MUNetworkManager sharedInstance] deleteCollectionItemFromCollectionWithName: @"ios"
                                                                       withItemID: @"532f4ec1000000c41d000002"
                                                                   withCompletion: ^(BOOL isDeleteSuccess, NSError *error) {
                                                                       
                                                                       if (isDeleteSuccess)
                                                                       {
                                                                           NSLog(@"DELETION SUCCESSFUL");
                                                                       }
                                                                       else
                                                                       {
                                                                           NSLog(@"DELETION FAILED");
                                                                       }
                                                                       
                                                                   }];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
